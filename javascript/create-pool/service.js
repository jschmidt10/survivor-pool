'use strict';

const AWS = require("aws-sdk");
const async = require("async");
const validator = require("./validator");
const getPool = require("../get-pool");

AWS.config.update({region: "us-east-1"});

const dynamo = new AWS.DynamoDB.DocumentClient();

// Creates a new pool.
//   - table         The dynamo table to use.
//   - env           The current runtime environment.
//   - seasonService A service which provides the current season.
//   - pool          The pool to create.
//   - callback      The callback to receive results or error information.
exports.execute = function(table, env, seasonService, pool, callback) {
  async.waterfall([
    getSeason(seasonService),
    runValidations(pool),
    insertPool(table, env),
    insertPoolListEntry(table, env, pool)
  ], function(err, result) {
    if (err) {
      callback(err, null);
    }
    else {
      callback(null, pool);
    }
  });
};

function getSeason(seasonService) {
  return function(next) {
    seasonService.execute(next);
  };
}

function runValidations(pool) {
  return function(result, next) {
    validator.validate(result, pool, next);
  };
}

function insertPool(table, env) {
  return function(validPool, next) {
    validPool.id = "POOL:" + validPool.name;
    validPool.env = env;

    var putRequest = {
      TableName: table,
      Item: validPool
    };

    dynamo.put(putRequest, next);
  };
}

function insertPoolListEntry(table, env, pool) {
  return function(result, next) {
    var record = {
      id: "POOL_LIST:" + env,
      env: pool.name,
      name: pool.name,
      url: pool.url
    };

    var putRequest = {
      TableName: table,
      Item: record
    };

    dynamo.put(putRequest, next);
  };
}
