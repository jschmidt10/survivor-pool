'use strict';

const async = require("async");
const AWS = require("aws-sdk");

AWS.config.update({region: "us-east-1"});

const dynamo = new AWS.DynamoDB.DocumentClient();
const seasonId = "SEASON";

// Adds the given season to DynamoDB.
//   - table    The dynamo table to use.
//   - env      The current runtime environment.
//   - player   The player to eliminate.
//   - callback The callback to receive results or error information.
exports.execute = function(table, env, player, callback) {

  async.waterfall([
    function getSeason(next) {
      var getRequest = {
        TableName: table,
        Key: {
          id: seasonId,
          env: env
        }
      };

      dynamo.get(getRequest, next);
    },

    function eliminatePlayer(data, next) {
      var season = data.Item;
      var toEliminate = season.contestants.find(function (c) {
        return c.name == player;
      });

      if (!toEliminate) {
        callback(Error("Could not find a player named " + player), null);
      }

      toEliminate.status = "eliminated";

      next(null, season);
    },

    function updateSeason(season, next) {
      var putRequest = {
        TableName: table,
        Item: season
      };

      dynamo.put(putRequest, next);
    }

  ], callback);
};