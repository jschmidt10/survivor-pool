const service = require("./service");
const async = require("async");
const AWS = require("aws-sdk");

AWS.config.update({region: 'us-east-1'});

const env = "test";
const table = "survivorpoolv2";
const dynamo = new AWS.DynamoDB.DocumentClient();

var getRequest = {
  TableName: table,
  Key: {
    id: "SEASON",
    env: env
  }
};

describe("Create Season Service", function() {

  it("errors when missing name", function(done) {
    var season = newSeason();
    season.name = null;
    service.execute(table, env, season, function(err, data) {
      expect(err).not.toBe(null);
      expect(data).toBe(null);
      done();
    });
  });

  it("errors when zero contestants", function(done) {
    var season = newSeason();
    season.contestants = [];
    service.execute(table, env, season, function(err, data) {
      expect(err).not.toBe(null);
      expect(data).toBe(null);
      done();
    });
  });

  it("inserts when all fields present", function(done) {
    var season = newSeason();
    async.waterfall([
      function executeService(next) {
        service.execute(table, env, season, next);
      },
      function fetchSeason(data, next) {
        dynamo.get(getRequest, next);
      },
      function parseResult(data, next) {
        next(null, data.Item);
      }
    ], function(err, fetchedSeason) {
      expect(err).toBe(null);
      expect(fetchedSeason.name).toBe(season.name);
      expect(fetchedSeason.contestants.length).toBe(season.contestants.length);
      done();
    });
  });

});

function newSeason() {
  return {
           name: "Test Create Season",
           contestants: [
             { name: "Leroy", pic: "leroy.gif", status: "Active" },
             { name: "Bert", pic: "bert.gif", status: "Active" },
             { name: "Carla", pic: "carla.jpg", status: "Eliminated" }
           ]
         };
}