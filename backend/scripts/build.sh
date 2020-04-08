#!/usr/bin/env bash

set -o errexit
set -o pipefail

declare basedir="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

cd ${basedir}/..
echo "Building $(pwd)"

echo "Formatting"
npm run-script format
echo "Downloading dependencies"
npm install
echo "Testing"
npm test
echo "Packing"
npm pack