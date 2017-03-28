const service = require("./service");
const async = require("async");
const AWS = require("aws-sdk");

AWS.config.update({region: 'us-east-1'});

const env = "test";
const table = "survivorpoolv2";
const dynamo = new AWS.DynamoDB.DocumentClient();

var pool1 = {
  name: "My Pool 1",
  url: "http://mypool1.com"
};

var pool2 = {
  name: "My Pool 2",
  url: "http://mypool2.com"
};

var write1 = {
  TableName: table,
  Item: {
    id: "POOL_LIST:" + env,
    env: pool1.name,
    name: pool1.name,
    url: pool1.url
  }
};

var write2 = {
  TableName: table,
  Item: {
    id: "POOL_LIST:" + env,
    env: pool2.name,
    name: pool2.name,
    url: pool2.url
  }
};

var write3 = {
  TableName: table,
  Item: {
    id: "SEASON",
    env: env,
    name: "Season 1"
  }
};

describe("List Pools Service", function() {

  it("should fetch all pools", function(done) {
    async.waterfall([
      function insert1(next) {
        dynamo.put(write1, next);
      },
      function insert2(res, next) {
        dynamo.put(write2, next);
      },
      function insert3(res, next) {
        dynamo.put(write3, next);
      },
      function listPools(res, next) {
        service.execute(table, env, next);
      }
    ], function(err, pools) {
      expect(err).toBe(null);
      expect(pools.length >= 2).toBe(true);
      expect(pools).toContain(pool1);
      expect(pools).toContain(pool2);
      done();
    });
  });

});