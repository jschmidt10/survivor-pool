#!/bin/bash
#
# Helper script that will re-pack survivorpool-core and then rebuild libs that use it.
#

cd core/

if ! npm test
then
  echo "Failed tests for survivorpool-core"
  exit 1
fi

if ! npm pack
then
  echo "Failed to build survivorpool-core"
  exit 1
fi

for module in backend manager
do
  echo "Re-installing core into ${module}"
  cd ../${module}/

  if ! npm install ../core/survivorpool-core*.tgz
  then
    echo "Failed to install core into ${module}"
    exit 1
  fi

  if ! npm test
  then
    echo "Failed tests for ${module}"
    exit 1
  fi
done
