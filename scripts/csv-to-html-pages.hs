{-# LANGUAGE OverloadedStrings #-}
{-# LANGUAGE QuasiQuotes #-}
{-# LANGUAGE TemplateHaskell #-}

import Control.Applicative
import qualified Data.ByteString.Lazy as BL
import Data.Csv
import qualified Data.Vector as V

import Text.Blaze.Html.Renderer.String (renderHtml)
import Text.Blaze.Html
import Text.Hamlet

import Data.Char (isAlphaNum, toLower)
import Data.List (intercalate)
import Data.String.Utils (replace)

import System.Directory (createDirectory, removeDirectoryRecursive, renameDirectory)

data CsvData = CsvData
    { name     :: !String
    , bio      :: !String
    , pic      :: !String
    , title    :: !String
    , abstract :: !String
    , checked  :: !String
    }-- deriving (Show)

data PageData = PageData
    { slug             :: !String
    , speakerName      :: !String
    , speakerBioHtml   :: !String
    , speakerPicUrl    :: !String
    , talkTitle        :: !(Maybe String)
    , talkAbstractHtml :: !(Maybe String)
    } deriving (Show)

instance FromNamedRecord CsvData where
    parseNamedRecord r = CsvData <$> r .: "Name"
                                 <*> r .: "Bio"
                                 <*> r .: "Pic"
                                 <*> r .: "Title"
                                 <*> r .: "Abstract"
                                 <*> r .: "Checked?"

main :: IO ()
main = do
    csvData <- BL.readFile "./Speaker Info - Session Info.csv"
    case decodeByName csvData of
        Left err -> putStrLn err
        Right (_, v) -> V.forM_ v $ \ i -> do
            case csvToMaybePage i of
              Nothing -> return ()
              Just p  -> do let fileName = slug p ++ ".html"  -- cannot write to `..`
                            putStrLn $ "Writing to " ++ fileName
                            writeFile fileName $ renderTemplate p
                            -- putStrLn $ renderTemplate p
            -- renameDirectory speakersTmpDir speakersDir

renderTemplate :: PageData -> String
renderTemplate p = renderHtml ( $(shamletFile "speaker-page-template.hamlet") )

csvToMaybePage :: CsvData -> Maybe PageData
csvToMaybePage (CsvData "" _ _ _ _ _) = Nothing
csvToMaybePage (CsvData _ "" _ _ _ _) = Nothing
csvToMaybePage (CsvData _ _ "" _ _ _) = Nothing
csvToMaybePage (CsvData name bio pic title abstract _) =
  Just $ PageData
    { slug             = toSlug name
    , speakerName      = name
    , speakerBioHtml   = htmlEncode bio
    , speakerPicUrl    = pic
    , talkTitle        = nothingIfEmpty title
    , talkAbstractHtml = nothingIfEmpty $ htmlEncode abstract
    }
  where
    htmlEncode = replace "\n" "<br/><br/>" . replace "\n\n" "\n"
    nothingIfEmpty str = if str == "" then Nothing else Just $ str

toSlug :: String -> String
toSlug = let alphaNumsOnly x = if isAlphaNum x then x else ' '
         in intercalate "-" . words . map (toLower . alphaNumsOnly) . filter (/= '\'')
