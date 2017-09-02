"use strict";

const DynamoFactory = require("survivorpool-core/aws-dynamo-factory");
const GetSeasonService = require("./get-season-service");
const PoolValidation = require("./pool-validation");

module.exports = class CreatePoolService {

  constructor(seasonService = new GetSeasonService()) {
    this.seasonService = seasonService;
    this.dynamo = DynamoFactory.newInstance();
    this.validator = new PoolValidation.PoolValidator();
  }

  /*
   * Creates a new pool.
   */
  execute(config, pool) {
    return new Promise((resolve, reject) => {
      this
        .seasonService
        .execute(config)
        .then((season) => this.validator.validate(pool, season))
        .then((validPool) => insertPoolRecord(this.dynamo, config, pool))
        .then((res) => insertPoolListRecord(this.dynamo, config, pool))
        .then((res) => resolve(res))
        .catch((err) => reject(err));
    });
  }
};

/*
 * Inserts an entry into the pool list for searching.
 */
function insertPoolListRecord(dynamo, config, pool) {
  return dynamo.put(insertRequest(config, poolListItem(config, pool))).promise();
}

/*
 * Inserts a pool record into Dynamo.
 */
function insertPoolRecord(dynamo, config, pool) {
  return dynamo.put(insertRequest(config, poolItem(config, pool))).promise();
}

/*
 * Prepares the pool list entry item.
 */
function poolListItem(config, pool) {
  return {
    id: "POOL_LIST:" + config.env,
    env: pool.name,
    name: pool.name,
    url: encodeURIComponent(pool.name)
  };
}

/*
 * Creates the full Dynamo insert request.
 */
function insertRequest(config, item) {
  return {
    TableName: config.table,
    Item: item
  };
}

/*
 * Preps the pool for insert into Dynamo by adding internal fields and simplifying contestants.
 */
function poolItem(config, pool) {
  var item = {
    id: "POOL:" + pool.name,
    name: pool.name,
    env: config.env
  };

  // Masks out the fields we don't need
  item.players = pool.players.map((p) => {
    return {
      name: p.name,
      contestants: p.contestants.map((c) => ({ name: c.name }))
    };
  });

  return item;
}