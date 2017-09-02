"use strict";

const AWSConfig = require("../app/aws-config");
const GetSeasonService = require("../app/get-season-service");
const DynamoFactory = require("../app/aws-dynamo-factory");

let dynamo = DynamoFactory.newInstance();
let testConfig = new AWSConfig("survivorpoolv2", "test");

describe("GetSeasonService", function() {

  let service = new GetSeasonService();
  let expectedSeason = {
    name: "Test Season",
    contestants: [
      { name: "Bobby", pic: "bobby.gif", status: "Active" },
      { name: "Susan", pic: "susan.gif", status: "Active" },
      { name: "Tina", pic: "tina.jpg", status: "Eliminated" }
    ]
  };

  it("should return the current season", function(done) {
    dynamo
      .put(testDataPutRequest(testConfig))
      .promise()
      .then((res) => service.execute(testConfig))
      .then((season) => expect(season).toEqual(expectedSeason))
      .then((res) => done())
      .catch((err) => {
        this.fail(err);
        done();
      })
  });
});

function testDataPutRequest(config) {
  return {
    TableName: config.table,
    Item: {
      "id":  "SEASON",
      "name": "Test Season",
      "env": config.env,
      "contestants": [
        {
          "name": "Bobby",
          "pic": "bobby.gif",
          "status": "Active"
        },
        {
          "name": "Susan",
          "pic": "susan.gif",
          "status": "Active"
        },
        {
          "name": "Tina",
          "pic": "tina.jpg",
          "status": "Eliminated"
        }
      ]
    }
  };
}
