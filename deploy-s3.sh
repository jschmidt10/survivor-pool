#!/bin/bash
#
# Deploys the UI files to S3. You may need to explicitly make the folder public again.

aws s3 sync ./survivorpool-ui/ s3://survivorpool/public/ --exclude ".idea/*"
