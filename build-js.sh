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

cd core/
echo "Running core unit tests"
npm install
npm test
echo "Packing core"
npm pack

for module in backend manager
do
  cd ../${module}/

  echo "Re-installing core into ${module}"
  npm install ../core/survivorpool-core*.tgz

  npm install
  echo "Running ${module} unit tests"
  npm test
done

echo "Packaging backend for AWS Lambda"
cd ..
mkdir -p ${buildDir}
cd backend/
zip -r ${buildArtifact} index.js lib/ node_modules/

mv ${buildArtifact} ../${buildDir}/

echo "created ${buildDir}/${buildArtifact}"