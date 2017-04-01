const service = require("./service");
const async = require("async");
const AWS = require("aws-sdk");

AWS.config.update({region: 'us-east-1'});

const env = "test";
const table = "survivorpoolv2";
const dynamo = new AWS.DynamoDB.DocumentClient();

var season = {
  id: "SEASON",
  env: env,
  name: "Test Eliminate Player",
  contestants: [
    { name: "Leroy", pic: "leroy.gif", status: "active" },
    { name: "Bert", pic: "bert.gif", status: "active" },
    { name: "Carla", pic: "carla.jpg", status: "active" }
  ]
};

var putRequest = {
  TableName: table,
  Item: season
};

var getRequest = {
  TableName: table,
  Key: {
    id: season.id,
    env: env
  }
};

describe("Eliminate Player Service", function() {

  it("should eliminate a player", function(done) {
    async.waterfall(
    [
      function createTestSeason(next) {
        dynamo.put(putRequest, next);
      },
      function eliminatePlayer(res, next) {
        service.execute(table, env, "Leroy", next);
      },
      function fetchResult(res, next) {
        dynamo.get(getRequest, next);
      }
    ],
    function(err, res) {
      expect(err).toBeNull();

      var season = res.Item;

      var leroy = season.contestants.find(function(c) { return c.name == "Leroy"; });
      var bert = season.contestants.find(function(c) { return c.name == "Bert"; });
      var carla = season.contestants.find(function(c) { return c.name == "Carla"; });

      expect(leroy.status).toBe("eliminated");
      expect(bert.status).toBe("active");
      expect(carla.status).toBe("active");
      done();
    });
  });

});