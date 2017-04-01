'use strict';

const AWS = require("aws-sdk");
const async = require("async");
const flatmap = require("flatmap");

AWS.config.update({region: "us-east-1"});

const dynamo = new AWS.DynamoDB.DocumentClient();

const ERR_NO_POOL_NAME_GIVEN = Error("Requires parameter 'poolName'.");
const ERR_POOL_NOT_FOUND = Error("Found no pool with the given name.");
const ERR_UNKNOWN_CONTESTANT = Error("Found a contestant that doesn't exist in the season.");

exports.ERR_NO_POOL_NAME_GIVEN = ERR_NO_POOL_NAME_GIVEN;
exports.ERR_POOL_NOT_FOUND = ERR_POOL_NOT_FOUND;
exports.ERR_UNKNOWN_CONTESTANT = ERR_UNKNOWN_CONTESTANT;

/**
 * Gets a pool for the current season of survivor by name.
 *
 * @param table         DynamoDB table
 * @param env           Runtime environment
 * @param seasonService A service which can fetch the current season of survivor
 * @param poolName      The name of the pool to fetch
 * @param callback      The callback that will receive the errors or results.
 */
exports.execute = function(table, env, seasonService, poolName, callback) {
  async.waterfall(
  [
    validateParams(poolName),
    getSeason(seasonService),
    getPool(table, env, poolName),
    mergePoolAndSeason()
  ],
  callback);
};

/**
 * Validates the service arguments.
 */
function validateParams(poolName) {
  return function(next) {
    if (!poolName) {
      next(ERR_NO_POOL_NAME_GIVEN, null);
    }
    else {
      next(null, 0);
    }
  };
}

/**
 * Fetches the current season with the given service.
 */
function getSeason(seasonService) {
  return function(result, next) {
    seasonService.execute(next);
  };
}

/**
 * Fetches the pool by name.
 */
function getPool(table, env, poolName) {
  return function(season, next) {
    var request = {
      TableName: table,
      Key: {
        id: "POOL:" + poolName,
        env: env
      }
    };

    dynamo.get(request, function(err, data) {
      if (err) {
        next(err, null);
      }
      else if (!data.Item) {
        next(ERR_POOL_NOT_FOUND, null);
      }
      else {
        next(null, season, data.Item);
      }
    });
  };
}

/**
 * Merges the contestant information in the season into the pool. This will pick up the contestants status and picture.
 */
function mergePoolAndSeason() {
  return function(season, pool, next) {
    var poolContestants = flatmap(pool.players, function(p) { return p.contestants; });
    var unknownContestant = false;

    poolContestants.forEach(function(pc) {
      var seasonContestant = season.contestants.find(function(sc) { return sc.name == pc.name; });

      if (!seasonContestant) {
        unknownContestant = true;
      }
      else {
        pc.pic = seasonContestant.pic;
        pc.status = seasonContestant.status;
      }
    });

    if (unknownContestant) {
      next(ERR_UNKNOWN_CONTESTANT, null);
    }
    else {
      next(null, pool);
    }
  };
}