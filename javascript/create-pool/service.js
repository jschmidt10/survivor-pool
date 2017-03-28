'use strict';

const AWS = require("aws-sdk");
const async = require("async");
const validator = require("./validator");

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
    var poolToInsert = {};

    poolToInsert.id = "POOL:" + validPool.name;
    poolToInsert.name = validPool.name;
    poolToInsert.env = env;
    poolToInsert.players = validPool.players.map(function (p) {
      var player = {};
      player.name = p.name;
      player.contestants = p.contestants.map(function (c) {
        return { name: c.name };
      });
      return player;
    });

    var putRequest = {
      TableName: table,
      Item: poolToInsert
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
      url: encodeURIComponent(pool.name)
    };

    var putRequest = {
      TableName: table,
      Item: record
    };

    dynamo.put(putRequest, next);
  };
}
