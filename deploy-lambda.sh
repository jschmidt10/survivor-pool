#!/bin/bash
#
# Deploys survivorpool-backend to AWS Lambda.

set -o errexit
set -o pipefail

if [[ $# -ne 1 ]]
then
  echo "Missing required argument: <environment> (test or prod)"
  exit 1
fi

environment="$1"
lambdaFunName=""

if [[ "${environment}" == "test" ]]
then
  lambdaFunName="survivorpool-test"
elif [[ "${environment}" == "prod" ]]
then
  lambdaFunName="survivorpool"
else
  echo "Unrecognized environment: '${environment}'. Must be 'test' or 'prod'."
  exit 1
fi

buildDir="dist"
buildArtifact="survivorpool-backend.zip"
fullArtifact="${buildDir}/${buildArtifact}"

if [[ ! -f ${fullArtifact} ]]
then
  echo "You have not yet built ${fullArtifact}. Run build-js.sh first."
  exit 1
fi

echo "Deploying ${fullArtifact} to AWS Lambda function ${lambdaFunName}"
if aws lambda update-function-code --function-name ${lambdaFunName} --zip-file fileb://${fullArtifact} --publish
then
  echo "Success"
fi