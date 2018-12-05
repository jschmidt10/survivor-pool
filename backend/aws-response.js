"use strict";

/*
 * An AWS Lambda Proxy Response.
 */
module.exports = function(statusCode, body) {
  return {
    statusCode: statusCode,
    body: JSON.stringify(body),
    isBase64Encoded: true,
    headers: {
      "Content-type": "application/json",
      "Access-Control-Allow-Headers":
        "Content-Type,X-Amz-Date,Authorization,X-Api-Key",
      "Access-Control-Allow-Methods": "*",
      "Access-Control-Allow-Origin": "*"
    }
  };
};
