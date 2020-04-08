#!/usr/bin/env bash

set -o errexit
set -o pipefail

declare basedir="$( cd "$(dirname "$0")" >/dev/null 2>&1 ; pwd -P )"

find ${basedir}/.. -name "*js" -type f | grep -v "node_modules" | xargs js-beautify -j -r -e '\n'