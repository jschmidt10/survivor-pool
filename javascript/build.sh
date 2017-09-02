#!/bin/bash
#
# Builds all javascript survivor-pool modules.
#
# Current modules: create-pool, fetch-season, get-pool, list-pools
#
BASEDIR=`dirname "$0"`

if [[ $# -gt 0 ]];
then
  echo "Building modules ${@:1}"
  MODULES=${@:1}
else
  echo "Building all modules"
  MODULES=( create-pool fetch-season get-pool list-pools )
fi

cd ${BASEDIR}

for MODULE in "${MODULES[@]}";
do
  pushd ${MODULE} >> /dev/null
  echo "Building ${MODULE}"

  echo "Running 'npm test'"
  npm test

  if [[ $? -ne 0 ]];
  then
    echo "Test failures for ${MODULE}, not building"
  else
    echo "Test passed for ${MODULE}, building zip"

    if [[ -f "${MODULE}.zip" ]];
    then
      echo "Found a previous zip file, removing it"
      rm -f "${MODULE}.zip"
    fi

    zip -r "${MODULE}.zip" *
  fi

  popd >> /dev/null
done