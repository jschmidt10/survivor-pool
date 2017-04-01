const service = require("./service");
const async = require("async");
const flatmap = require("flatmap");
const AWS = require("aws-sdk");

AWS.config.update({region: 'us-east-1'});

const env = "test";
const table = "survivorpoolv2";
const dynamo = new AWS.DynamoDB.DocumentClient();

var season = {
  id: "SEASON",
  env: env,
  name: "Season 1",
  contestants: [
    { name: "Contestant1", pic: "c1.jpg", status: "active" },
    { name: "Contestant2", pic: "c2.jpg", status: "active" }
  ]
};

var pool = {
  id: "POOL:Create Pool Test",
  env: env,
  name: "Create Pool Test",
  url: "pool1.com",
  players: [
    {
      name: "Player1",
      contestants: [
        { name: "Contestant1" }
      ]
    },
    {
      name: "Player2",
      contestants: [
        { name: "Contestant2" }
      ]
    }
  ]
};

var seasonService = {};
seasonService.execute = function(callback) {
  callback(null, season);
};

describe("Get Pool Service", function() {

  it("should fetch a pool", function(done) {
    async.waterfall(
    [
      function writeSeason(next) {
        dynamo.put({ TableName: table, Item: season }, next);
      },
      function writePool(res, next) {
        dynamo.put({ TableName: table, Item: pool }, next);
      },
      function getPool(res, next) {
        service.execute(table, env, seasonService, pool.name, next);
      }
    ],
    function(err, fetchedPool) {
      expect(err).toBeNull();
      expect(fetchedPool).not.toBeNull();
      expect(fetchedPool.name).toBe(pool.name);
      expect(fetchedPool.players.size).toBe(pool.players.size);

      var contestants = flatmap(fetchedPool.players, function(p) { return p.contestants; });
      var c1 = contestants.find(function(c) { return c.name == "Contestant1" });

      expect(c1.pic).toBe("c1.jpg");
      expect(c1.status).toBe("active");
      done();
    });
  });

  it("should fail if no pool name given", function(done) {
    service.execute(table, env, seasonService, null, function(err, pool) {
      expect(err.message).toBe(service.ERR_NO_POOL_NAME_GIVEN.message);
      done();
    });
  });

});