'use strict';

const async = require("async");
const AWS = require("aws-sdk");

AWS.config.update({region: "us-east-1"});

const dynamo = new AWS.DynamoDB.DocumentClient();
const seasonId = "SEASON";

/**
 * Eliminates a player from the current season.
 * @param table     DynamoDB table
 * @param env       Runtime environment
 * @param player    The players name to eliminate
 * @param callback  Callback to receive errors/results
 */
exports.execute = function(table, env, player, callback) {
  async.waterfall(
  [
    getSeason(table, env),
    eliminatePlayer(player),
    saveSeason(table)
  ],
  callback);
};

/**
 * Gets the current season.
 * @param table     DynamoDB table
 * @param env       Runtime environment
 */
function getSeason(table, env) {
  return function(result, next) {
    var getRequest = {
      TableName: table,
      Key: {
        id: seasonId,
        env: env
      }
    };

    dynamo.get(getRequest, next);
  };
}

/**
 * Eliminates the passed in player from the fetched season.
 */
function eliminatePlayer(player) {
  return function(data, next) {
    var season = data.Item;
    var toEliminate = season.contestants.find(function (c) { return c.name == player; });

    if (!toEliminate) {
      next(Error("Could not find a player named " + player), null);
    }
    else {
      toEliminate.status = "eliminated";
      next(null, season);
    }
  };
}

/**
 * Saves the updated season back to DynamoDB.
 * @param table     DynamoDB table
 */
function saveSeason(table) {
  return function(season, next) {
    var putRequest = {
      TableName: table,
      Item: season
    };

    dynamo.put(putRequest, next);
  };
}
