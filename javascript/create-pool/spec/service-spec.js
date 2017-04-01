const async = require("async");
const AWS = require("aws-sdk");
const service = require("../service");

AWS.config.update({region: 'us-east-1'});

const env = "test";
const table = "survivorpoolv2";
const dynamo = new AWS.DynamoDB.DocumentClient();

var season = {
  name: "Season 1",
  contestants: [
    { name: "Contestant1" },
    { name: "Contestant2" },
    { name: "Contestant3" },
    { name: "Contestant4" },
    { name: "Contestant5" },
    { name: "Contestant6" }
  ]
};

var seasonService = {};
seasonService.execute = function(callback) {
  callback(null, season);
};

var pool = {
  name: "My Pool",
  url: "My%20Pool",
  players: [
    {
      name: "Tommy",
      contestants: [
        { name: "Contestant1" },
        { name: "Contestant2" },
        { name: "Contestant3" },
      ]
    },
    {
      name: "Tina",
      contestants: [
        { name: "Contestant4" },
        { name: "Contestant5" },
        { name: "Contestant6" },
      ]
    }
  ]
};

var getPoolRequest = {
  TableName: table,
  Key: {
    id: "POOL:" + pool.name,
    env: env
  }
};

var getPoolListRequest = {
  TableName: table,
  Key: {
    id: "POOL_LIST:" + env,
    env: pool.name
  }
};

describe("Create Pool Service", function() {

  it("should create a pool record", function(done) {
    async.waterfall([
      function execute(next) {
        service.execute(table, env, seasonService, pool, next);
      },
      function fetch(res, next) {
        dynamo.get(getPoolRequest, next);
      },
      function getItem(data, next) {
        next(null, data.Item);
      }
    ],
    function(err, fetchedPool) {
      expect(err).toBe(null);
      expect(fetchedPool.name).toBe(pool.name);
      expect(fetchedPool.players.size).toBe(pool.players.size);
      done();
    });
  });

  it("should create a pool list record", function(done) {
    async.waterfall([
      function execute(next) {
        service.execute(table, env, seasonService, pool, next);
      },
      function fetch(res, next) {
        dynamo.get(getPoolListRequest, next);
      },
      function getItem(data, next) {
        next(null, data.Item);
      }
    ],
    function(err, poolListEntry) {
      expect(err).toBe(null);
      expect(poolListEntry.name).toBe(pool.name);
      expect(poolListEntry.url).toBe(pool.url);
      done();
    });
  });

});