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
      "Content-type": "application/json"
    }
  };
};