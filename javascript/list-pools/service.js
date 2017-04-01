'use strict';

const AWS = require("aws-sdk");
const assert = require("assert");

AWS.config.update({region: "us-east-1"});

const dynamo = new AWS.DynamoDB.DocumentClient();

/**
 * Lists all survivor pools.
 *
 * @param table     DynamoDB table
 * @param env       Runtime environment
 * @param callback  The callback that will receive errors/results.
 */
exports.execute = function(table, env, callback) {

  var request = {
    TableName: table,
    KeyConditionExpression: "id = :id",
    ExpressionAttributeValues: { ":id": "POOL_LIST:" + env }
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

/**
 * Ensures that we only return the fields we need.
 */
function simplifyPool(item) {
  return { name: item.name, url: item.url };
}