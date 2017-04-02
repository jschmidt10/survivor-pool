'use strict';

const AWS = require("aws-sdk");
const async = require("async");
const validator = require("./validator");

AWS.config.update({region: "us-east-1"});

const dynamo = new AWS.DynamoDB.DocumentClient();

/**
 * Creates a new Survivor pool.
 * @param table             DynamoDB table
 * @param env               Runtime environment
 * @param seasonService     A service for fetching the current season
 * @param pool              Pool to create
 * @param callback          Callback for errors/results
 */
exports.execute = function(table, env, seasonService, pool, callback) {
  async.waterfall([
    getSeason(seasonService),
    runValidations(pool),
    insertPool(table, env),
    insertPoolListEntry(table, env, pool)
  ],
  callback);
};

/**
 * Fetches the current season using the passed in service.
 */
function getSeason(seasonService) {
  return function(next) {
    seasonService.execute(next);
  };
}

/**
 * Validates the season/pool.
 */
function runValidations(pool) {
  return function(result, next) {
    validator.validate(result, pool, next);
  };
}

/**
 * Inserts the pool to the DynamoDB.
 */
function insertPool(table, env) {
  return function(validPool, next) {
    var poolToInsert = {};

    poolToInsert.id = "POOL:" + validPool.name;
    poolToInsert.name = validPool.name;
    poolToInsert.env = env;

    // Masks out the fields we don't need
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

/**
 * Inserta a pool list entry for this pool.
 */
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

    dynamo.put(putRequest, function(err, result) {
      if (err) {
        next(err, null);
      }
      else {
        next(null, record);
      }
    });
  };
}
