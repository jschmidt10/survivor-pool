"use strict";

const AWSConfig = require("../app/aws-config");
const ListPoolsService = require("../app/list-pools-service");
const DynamoFactory = require("../app/aws-dynamo-factory");

let dynamo = DynamoFactory.newInstance();
let testConfig = new AWSConfig("survivorpoolv2", "test");

describe("ListPoolsService", function() {

  let service = new ListPoolsService();
  let pool1 = { name: "My Pool 1", url: "http://mypool1.com" };
  let pool2 = { name: "My Pool 2", url: "http://mypool2.com" };

  it("should list all pools", function(done) {
    dynamo
      .put(putPoolRequest(pool1))
      .promise()
      .then((res) => dynamo.put(putPoolRequest(pool2)).promise())
      .then((res) => dynamo.put(putPoolRequest(pool2)).promise())
      .then((res) => dynamo.put(putSeasonRequest()).promise())
      .then((res) => service.execute(testConfig))
      .then((pools) => {
        expect(pools.length >= 2).toBe(true);
        expect(pools).toContain(pool1);
        expect(pools).toContain(pool2);
        done();
      })
      .catch((err) => {
        this.fail(err);
        done();
      })
  });

});

function putPoolRequest(pool) {
  return {
    TableName: testConfig.table,
    Item: {
      id: "POOL_LIST:" + testConfig.env,
      env: pool.name,
      name: pool.name,
      url: pool.url
    }
  };
}

function putSeasonRequest(seasonName) {
  return {
    TableName: testConfig.table,
    Item: {
      id: "SEASON",
      env: testConfig.env,
      name: "Season 1"
    }
  };
}