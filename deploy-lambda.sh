#!/bin/bash
#
# Packages and deploys survivorpool-backend to AWS.

cd survivorpool-backend/
npm test

if [[ $? -ne 0 ]]
then
  echo "There were test failures in survivorpool-backend"
  exit 1
fi

zip -r survivorpool-backend.zip *

if [[ $? -ne 0 ]]
then
  echo "An error occurred while zipping survivorpool-backend"
  exit 1
fi

aws lambda update-function-code --function-name survivorpool --zip-file fileb://survivorpool-backend.zip --publish

if [[ $? -eq 0 ]]
then
  echo "Deployed successfully."
else
  echo "An error occurred while uploading the latest code"
fi
