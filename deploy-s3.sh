#!/bin/bash
#
# Deploys the UI files to S3. You may need to explicitly make the folder public again.

set -o errexit
set -o pipefail

declare basedir="$( cd "$(dirname "$0")" >/dev/null 2>&1 ; pwd -P )"

cd ${basedir}

if [[ ! -f ui/dist/public/index.html ]]
then
  echo "Did not the ui distribution in ui/dist. You need to run ui/scripts/build.sh first."
  exit 1
fi

if [[ $# -ne 1 ]]
then
  echo "Missing required argument: <environment> (test or prod)"
  exit 1
fi

environment="$1"
bucketRoot="s3://survivorpool"
bucketPath=""

if [[ "${environment}" == "test" ]]
then
  bucketPath="${bucketRoot}/test"
elif [[ "${environment}" == "prod" ]]
then
  bucketPath="${bucketRoot}/prod"
else
  echo "Unrecognized environment: '${environment}'. Must be 'test' or 'prod'."
  exit 1
fi

if aws s3 sync ui/dist/ ${bucketPath} --acl public-read
then
  echo "Success"
fi