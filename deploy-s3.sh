#!/bin/bash
#
# Deploys the UI files to S3. You may need to explicitly make the folder public again.

set -o errexit
set -o pipefail

declare basedir="$( cd "$(dirname "$0")" >/dev/null 2>&1 ; pwd -P )"

cd ${basedir}

if [[ $# -ne 1 ]]
then
  echo "Missing required argument: <environment> (test or prod)"
  exit 1
fi

environment="$1"
rootUrl=""
bucketPath=""

if [[ "${environment}" == "test" ]]
then
  bucketPath="s3://survivorpool/test"
  rootUrl="https://rz4n4jsmbd.execute-api.us-east-1.amazonaws.com/default/survivorpool-test"
elif [[ "${environment}" == "prod" ]]
then
  bucketPath="s3://survivorpool/prod"
  rootUrl="https://bnwylviwi2.execute-api.us-east-1.amazonaws.com/prod/survivorpool"
else
  echo "Unrecognized environment: '${environment}'. Must be 'test' or 'prod'."
  exit 1
fi

echo "Building ui"
./ui/scripts/build.sh
sed -i '' -e "s#{{ROOT_URL}}#${rootUrl}#g" ui/dist/public/js/survivorpool.js

echo "Deploying to S3"

if aws s3 sync ui/dist/ ${bucketPath} --acl public-read
then
  echo "Success"
fi