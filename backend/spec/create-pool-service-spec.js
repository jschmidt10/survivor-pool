"use strict";

const AWSConfig = require("survivorpool-core/aws-config");
const DynamoFactory = require("survivorpool-core/aws-dynamo-factory");
const CreatePoolService = require("../create-pool-service");

let dynamo = DynamoFactory.newInstance();
let testConfig = new AWSConfig("survivorpool", "test");

describe("CreatePoolService", function() {
  let service = new CreatePoolService();
  let testSeason = {
    name: "Season 1",
    contestants: [
      { name: "Contestant1", pic: "c1.jpg", status: "active" },
      { name: "Contestant2", pic: "c2.jpg", status: "active" }
    ]
  };

  let poolToSave = {
    name: "Create Pool Test",
    url: "pool1.com",
    players: [
      {
        name: "Player1",
        contestants: [{ name: "Contestant1" }]
      },
      {
        name: "Player2",
        contestants: [{ name: "Contestant2" }]
      }
    ]
  };

  let expectedPool = {
    id: "POOL:Create Pool Test",
    env: testConfig.env,
    name: "Create Pool Test",
    players: [
      {
        name: "Player1",
        contestants: [{ name: "Contestant1" }]
      },
      {
        name: "Player2",
        contestants: [{ name: "Contestant2" }]
      }
    ]
  };

  let expectedListEntry = {
    id: "POOL_LIST:" + testConfig.env,
    env: poolToSave.name,
    name: poolToSave.name,
    url: encodeURIComponent(poolToSave.name)
  };

  it("should create a pool record", function(done) {
    dynamo
      .put(putSeasonRequest(testConfig, testSeason))
      .promise()
      .then(res => service.execute(testConfig, poolToSave))
      .then(res => dynamo.get(getPoolRequest(testConfig, poolToSave)).promise())
      .then(res => expect(res.Item).toEqual(expectedPool))
      .then(res => done())
      .catch(err => {
        this.fail(err);
        done();
      });
  });

  it("should create a pool list record", function(done) {
    dynamo
      .put(putSeasonRequest(testConfig, testSeason))
      .promise()
      .then(res => service.execute(testConfig, poolToSave))
      .then(res =>
        dynamo.get(getListItemRequest(testConfig, poolToSave)).promise()
      )
      .then(res => expect(res.Item).toEqual(expectedListEntry))
      .then(res => done())
      .catch(err => {
        this.fail(err);
        done();
      });
  });
});

function putSeasonRequest(config, season) {
  return {
    TableName: config.table,
    Item: {
      id: "SEASON",
      name: season.name,
      env: config.env,
      contestants: season.contestants
    }
  };
}

function getListItemRequest(config, pool) {
  return {
    TableName: config.table,
    Key: {
      id: "POOL_LIST:" + config.env,
      env: pool.name
    }
  };
}

function getPoolRequest(config, pool) {
  return {
    TableName: config.table,
    Key: {
      id: "POOL:" + pool.name,
      env: config.env
    }
  };
}
