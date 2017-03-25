'use strict';

const AWS = require("aws-sdk");
const assert = require("assert");

AWS.config.update({region: "us-east-1"});

const dynamo = new AWS.DynamoDB.DocumentClient();

// Lists all current survivor pools.
//   - table    The dynamo table to use.
//   - env      The current runtime environment.
//   - callback The callback to receive results or error information.
exports.execute = function(table, env, callback) {

  var listId = "POOL_LIST:" + env;

  var request = {
    TableName: table,
    KeyConditionExpression: "id = :id",
    ExpressionAttributeValues: {
      ":id": listId
    }
  };

  dynamo.query(request, function(err, data) {
    if (err) {
      callback(err, null);
    }
    else {
      callback(null, data.Items.map(simplifyPool));
    }
  });
};

function simplifyPool(item) {
  return { name: item.name, url: item.url };
}