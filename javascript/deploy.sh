#!/bin/bash
#
# Deploys the zip files to their corresponding lambda function.
#
# Current modules: create-pool, fetch-season, get-pool, list-pools
#
BASEDIR=`dirname "$0"`
cd ${BASEDIR}

function update_lambda() {
  local FUN_NAME=$1
  local ZIP_FILE=$2

  aws lambda update-function-code --function-name $FUN_NAME --zip-file fileb://${ZIP_FILE} --publish

  if [[ $? -ne 0 ]];
  then
    echo "Failed to update ${FUN_NAME}"
  fi
}

if [[ $# -gt 0 ]];
then
  echo "Deploying modules ${@:1}"
  MODULES=${@:1}
else
  echo "Deploying all modules"
  MODULES=( create-pool fetch-season get-pool list-pools )
fi

for MODULE in "${MODULES[@]}";
do
  case ${MODULE} in
    "create-pool")
      update_lambda NewPool create-pool/create-pool.zip
      ;;
    "get-pool")
      update_lambda GetPool get-pool/get-pool.zip
      ;;
    "list-pools")
      update_lambda ListPools list-pools/list-pools.zip
      ;;
    "fetch-season")
      update_lambda CurrentSeason fetch-season/fetch-season.zip
      ;;
    *)
      echo "Unknown module ${MODULE}"
      ;;
  esac
done