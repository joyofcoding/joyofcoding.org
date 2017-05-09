#!/usr/bin/env bash

echo
echo Unlink folders if existing...

existing_links=docs/201?*
for l in $existing_links; do
  echo Unlinking $l
  unlink $l
done

echo
echo Create links to folders...

old_site_dirs=201?*
for d in $old_site_dirs; do
  echo Creating docs/$d
  # (cd docs; ln -s ../$d .)
done

echo
echo Done.
