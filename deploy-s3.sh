#!/bin/bash
#
# Deploys the UI files to S3. You may need to explicitly make the folder public again.

# First we need to build the dist ui
if ! cd ui
then
  echo "Didn't find a ui directory, you might be running this from the wrong directory"
  exit -1
fi

if npm run build
then 
  echo "Built ui distribution successfully, uploading to s3"

  aws s3 sync ./ s3://survivorpool/public/ \
    --exclude "*" \
    --include "app/**.html" \
    --include "css/*" \
    --include "dist/*" \
    --include "fonts/*" \
    --include "js/*" \
    --include "index.html" \
    --acl public-read
else
  echo "Failed to build ui distribution, aborting"
  exit -2
fi
