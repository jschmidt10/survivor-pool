"use strict";

const AWSConfig = require("../lib/aws-config");
const DynamoFactory = require("../lib/aws-dynamo-factory");
const SeasonService = require("../lib/season-service");

let dynamo = DynamoFactory.newInstance();
let testConfig = new AWSConfig("survivorpool", "test");

describe("GetSeasonService", function () {
    let service = new SeasonService();
    let expectedSeason = {
        name: "Test Season",
        contestants: [{
                name: "Bobby",
                pic: "bobby.gif",
                status: "Active"
            },
            {
                name: "Susan",
                pic: "susan.gif",
                status: "Active"
            },
            {
                name: "Tina",
                pic: "tina.jpg",
                status: "Eliminated"
            }
        ]
    };

    it("should return the current season", function (done) {
        dynamo
            .put(testDataPutRequest(testConfig))
            .promise()
            .then(res => service.get(testConfig))
            .then(season => expect(season).toEqual(expectedSeason))
            .then(res => done())
            .catch(err => {
                this.fail(err);
                done();
            });
    });
});

function testDataPutRequest(config) {
    return {
        TableName: config.table,
        Item: {
            id: "SEASON",
            name: "Test Season",
            env: config.env,
            contestants: [{
                    name: "Bobby",
                    pic: "bobby.gif",
                    status: "Active"
                },
                {
                    name: "Susan",
                    pic: "susan.gif",
                    status: "Active"
                },
                {
                    name: "Tina",
                    pic: "tina.jpg",
                    status: "Eliminated"
                }
            ]
        }
    };
}