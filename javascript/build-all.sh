#!/bin/bash
#
# Builds all javascript survivor-pool modules.
#
# Current modules: create-pool, fetch-season, get-pool, list-pools
#
BASEDIR=`dirname "$0"`
MODULES=(create-pool fetch-season get-pool list-pools)

cd ${BASEDIR}

for MODULE in ${MODULES};
do
  pushd ${MODULE}
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

    zip "${MODULE}.zip" *
  fi

  popd
done