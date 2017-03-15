'use strict';

const AWS = require("aws-sdk");

AWS.config.update({region: "us-east-1"});

const dynamo = new AWS.DynamoDB.DocumentClient();
const seasonId = "SEASON";

// Fetches the current season of survivor.
//   - table    The dynamo table to use.
//   - env      The current runtime environment.
//   - callback The callback to receive results or error information.
exports.execute = function(table, env, callback) {
  var params = {
    Key: {
      id: seasonId,
      env: env
    },
    TableName: table
  };

  dynamo.get(params, function(err, data) {
    if (err) {
      callback(err, null);
    }
    else {
      callback(null, data.Item);
    }
  });
};