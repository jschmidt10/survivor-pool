#!/usr/bin/env bash

set -o errexit
set -o pipefail

declare basedir="$( cd "$(dirname "$0")" >/dev/null 2>&1 ; pwd -P )"
cd ${basedir}/..

echo "Making a clean dist/ directory"
mkdir -p dist/
rm -rf ./dist/*

echo "Copying source into dist/"
cp -R public dist/

echo "Minifying app javascript"
mkdir dist/public/js
browserify -p tinyify --entry dist/public/app/app.js --outfile dist/public/js/survivorpool.js

echo "Removing original javascript"
find dist/public/app -name "*.js" -exec rm -f {} \;

echo "Success"