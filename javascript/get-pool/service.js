'use strict';

const AWS = require("aws-sdk");
const async = require("async");
const flatmap = require("flatmap");

AWS.config.update({region: "us-east-1"});

const dynamo = new AWS.DynamoDB.DocumentClient();

// Gets a pool.
//   - table           The dynamo table to use.
//   - env             The current runtime environment.
//   - seasonService   A service capable of getting the current season.
//   - poolName        The pool to fetch.
//   - callback        The callback to receive results or error information.
exports.execute = function(table, env, seasonService, poolName, callback) {
  if (!poolName) {
    callback(Error("Must pass a poolName."), null);
  }
  else {
    async.waterfall([

      function getSeason(next) {
        seasonService.execute(next);
      },

      function getPool(season, next) {
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
            next(Error("Pool not found"), null);
          }
          else {
            next(null, season, data.Item);
          }
        });
      },

      function mergePoolAndSeason(season, pool, next) {
        var poolContestants = flatmap(pool.players, function(p) { return p.contestants; });

        poolContestants.forEach(function(pc) {
          var seasonContestant = season.contestants.find(function(sc) { return sc.name == pc.name; });

          if (!seasonContestant) {
            next(Error("Contestant " + pc + " not in the current season."), null);
          }

          pc.pic = seasonContestant.pic;
          pc.status = seasonContestant.status;
        });

        next(null, pool);
      }

    ], callback);
  }
};