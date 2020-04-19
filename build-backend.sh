#!/bin/bash
#
# Tests and packs javascript artifacts for AWS Lambda.
#

set -o errexit
set -o pipefail

declare basedir="$( cd "$(dirname "$0")" >/dev/null 2>&1 ; pwd -P )"

cd ${basedir}

buildDir="dist"
buildArtifact="survivorpool-backend.zip"

echo "Building core"
cd core/
npm install
npm test
npm pack

echo "Building backend"
cd ../backend/
npm install ../core/survivorpool-core*.tgz
npm install
npm test

echo "Packaging backend for AWS Lambda"
cd ..
mkdir -p ${buildDir}
cd backend/
zip -r ${buildArtifact} index.js lib/ node_modules/

mv ${buildArtifact} ../${buildDir}/

echo "created ${buildDir}/${buildArtifact}"
