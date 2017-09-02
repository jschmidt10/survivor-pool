"use strict";

const GetSeasonService = require("./get-season-service");
const DynamoFactory = require("./aws-dynamo-factory");

const NoPoolNameGivenError = Error("Requires parameter 'poolName'.");
const PoolNotFoundError = Error("Could not find pool with the given name.");

module.exports = class GetPoolService {

  constructor(seasonService = new GetSeasonService()) {
    this.seasonService = seasonService;
    this.dynamo = DynamoFactory.newInstance();
  }

  /*
   * Gets a pool by name.
   */
  execute(config, poolName) {
    var season = null;

    return new Promise((resolve, reject) => {
      validateParams(poolName)
        .then((res) => this.seasonService.execute(config))
        .then((fetchedSeason) => {
          season = fetchedSeason;
          let request = fetchPoolRequest(config, poolName);
          return this.dynamo.get(request).promise();
        })
        .then((res) => res.Item)
        .then((pool) => combine(season, pool))
        .then((combined) => resolve(mask(combined)))
        .catch((err) => reject(err));
    });
  }
};

/*
 * Merges the season contestant information into the pool.
 */
function combine(season, pool) {
  if (!pool) {
    throw PoolNotFoundError;
  }

  getContestants(pool).forEach((c) => {
    let sc = season.contestants.find((s) => s.name === c.name);
    if (sc) {
      c.pic = sc.pic;
      c.status = sc.status;
    }
  });

  return pool;
}

/*
 * Gets all contestants from a pool.
 */
function getContestants(pool) {
  var allContestants = [];

  pool.players.forEach((player) => {
    player.contestants.forEach((c) => allContestants.push(c));
  });

  return allContestants;
}

/*
 * Creates the Dynamo request to get a pool by name.
 */
function fetchPoolRequest(config, poolName) {
  return {
    TableName: config.table,
    Key: {
      id: "POOL:" + poolName,
      env: config.env
    }
  };
}

/*
 * Validates that a poolName was given.
 */
function validateParams(poolName) {
  return new Promise((resolve, reject) => {
    if (!poolName)
      reject(NoPoolNameGivenError);
    else
      resolve(poolName);
  });
}

/*
 * Masks out internal fields that we don't need.
 */
function mask(pool) {
  return { name: pool.name, url: pool.url, players: pool.players };
}