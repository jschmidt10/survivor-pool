#!/usr/bin/env bash

set -o errexit
set -o pipefail

declare basedir="$( cd "$(dirname "$0")" >/dev/null 2>&1 ; pwd -P )"

cd ${basedir}/..

find public/app -name "*js" -type f | grep -v "node_modules" | xargs js-beautify -j -r -e '\n'
find public/app -name "*html" -type f | xargs js-beautify --type html -j -r -e '\n'

js-beautify -type html -j -r -e '\n' public/index.html
js-beautify -type css -j -r -e '\n' public/css/survivorpool.css