#!/bin/bash
#
# Helper script that will re-pack survivorpool-core and then rebuild libs that use it.
#

set -o errexit
set -o pipefail

cd core/
echo "Running core unit tests"
npm test
echo "Packing core"
npm pack

for module in backend manager
do
  cd ../${module}/

  echo "Re-installing core into ${module}"
  npm install ../core/survivorpool-core*.tgz

  echo "Running ${module} unit tests"
  npm test
done
