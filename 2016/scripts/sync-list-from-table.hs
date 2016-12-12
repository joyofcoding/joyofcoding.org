import Text.HandsomeSoup              (css)
import Text.XML.HXT.Core
import Text.XML.HXT.DOM.TypeDefs      (XNode(XTag))
import Text.XML.HXT.DOM.QualifiedName (localPart)
import Data.Tree.NTree.TypeDefs       (NTree(..))
import Text.RegexPR                   (subRegexPR)
import Data.List                      (groupBy)

-- TODO (cies):
--   * use an internal data structure {time, loc, cssClasses, innerHtml}
--   * use Lucid for formatting of output
--   * create a README explaining how to setup and run this script

main :: IO ()
main = do
  htmlFile <- readFile "../schedule.html"
  let doc   = readString [withRemoveWS yes, withParseHTML yes] htmlFile
      table = doc >>> css "table.schedule"
  locations <- runX $ table >>> css "thead th.track p.name" >>> getChildren >>> getText
  rawItems  <- runX $ table >>> css "tbody tr"
                            >>> ( css "td.time" >>> getChildren >>> getText )
                            &&& ( css "td.track"
                                  >>> removeAttr "colspan"
                                  >>> removeAttr "rowaspan"
                                  >>> ( getAttrValue "data-time"
                                        &&& getAttrValue "data-location"
                                        &&& getXmlContents ) )
  let pick general specific = if specific == "" then general else specific
      flattenTuple (thLoc, (trTime, (dataTime, (dataLoc, xml)))) =
          (pick trTime dataTime, pick thLoc dataLoc, xml)
      listItems = map tupleToListItem . map flattenTuple . concat
                . map (zip locations) . groupBy (\a b -> fst a == fst b)
                $ rawItems
  out <- runX ( root [] [constL listItems]
                >>> writeDocumentToString [withIndent yes, withOutputHTML] )
  putStrLn $ subRegexPR "(?m)(\\<ol class=\"schedule\"\\>)(.*)(^\\s*\\</ol\\>)"
                        ("\\1\n\n" ++ unlines out ++ "\\3") htmlFile

-- | Turns any XML tag into a <li> tag with the same attributes, while adding
-- two <p> tags as first children containing 'time' and 'location'.
tupleToListItem :: (String, String, NTree XNode) -> NTree XNode
tupleToListItem (time, location, (NTree (XTag _ attrs) children)) =
  let timeTag             = spanTag "time"     time
      locTag              = spanTag "location" location
      atTag               = spanTag "at"       " @ "
      spanTag className text = NTree (XTag (mkName "span")
                                           [NTree (XAttr $ mkName "class")
                                                  [NTree (XText className) []]])
                                     [NTree (XText text) []]
      metaWrapped tags    = NTree (XTag (mkName "div")
                              [NTree (XAttr $ mkName "class")
                                     [NTree (XText "meta") []]]) tags
      liWrapped tags      = NTree (XTag (mkName "li") attrs) tags
      withTimeAndLoc tags = [metaWrapped [timeTag, atTag, locTag]] ++ tags
  in  case children of
        [(NTree (XTag tagName aAttrs) aChildren)] -> if localPart tagName == "a"
            then liWrapped [NTree (XTag tagName aAttrs) $ withTimeAndLoc aChildren]
            else liWrapped $ withTimeAndLoc children
        _ -> liWrapped $ withTimeAndLoc children
tupleToListItem _ = error "Expected an XML tag"
