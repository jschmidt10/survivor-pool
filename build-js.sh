#!/bin/bash
#
# Helper script that will re-pack survivorpool-core and then rebuild libs that use it.
#

cd survivorpool-core/
npm pack

if [[ $? -ne 0 ]]
then
  echo "Failed to build survivorpool-core"
  exit 1
fi

for module in survivorpool-backend survivorpool-manager
do
  echo "Re-installing core into $module"
  cd ../$module/
  npm install ../survivorpool-core/survivorpool-core*.tgz


  if [[ $? -ne 0 ]]
  then
    echo "Failed to install core into $module"
    exit 1
  fi
done 
