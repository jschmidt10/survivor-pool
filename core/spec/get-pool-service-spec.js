"use strict";

const AWSConfig = require("../lib/aws-config");
const DynamoFactory = require("../lib/aws-dynamo-factory");
const GetPoolService = require("../lib/get-pool-service");

let dynamo = DynamoFactory.newInstance();
let testConfig = new AWSConfig("survivorpool", "test");

describe("GetPoolService", function () {
    let service = new GetPoolService();
    let testSeason = {
        name: "Season 1",
        contestants: [{
                name: "Contestant1",
                pic: "c1.jpg",
                status: "active"
            },
            {
                name: "Contestant2",
                pic: "c2.jpg",
                status: "active"
            }
        ]
    };

    let poolToSave = {
        name: "Create Pool Test",
        url: "pool1.com",
        players: [{
                name: "Player1",
                contestants: [{
                    name: "Contestant1"
                }]
            },
            {
                name: "Player2",
                contestants: [{
                    name: "Contestant2"
                }]
            }
        ]
    };

    let expectedPool = {
        name: "Create Pool Test",
        url: "pool1.com",
        players: [{
                name: "Player1",
                contestants: [{
                    name: "Contestant1",
                    pic: "c1.jpg",
                    status: "active"
                }]
            },
            {
                name: "Player2",
                contestants: [{
                    name: "Contestant2",
                    pic: "c2.jpg",
                    status: "active"
                }]
            }
        ]
    };

    it("should fetch a season with all contestant data", function (done) {
        dynamo
            .put(putSeasonRequest(testConfig, testSeason))
            .promise()
            .then(res => dynamo.put(putPoolRequest(testConfig, poolToSave)).promise())
            .then(res => service.execute(testConfig, expectedPool.name))
            .then(pool => expect(pool).toEqual(expectedPool))
            .then(res => done())
            .catch(err => {
                this.fail(err);
                done();
            });
    });

    it("should return a PoolNotFoundError when not found", function (done) {
        dynamo
            .put(putSeasonRequest(testConfig, testSeason))
            .promise()
            .then(res => dynamo.put(putPoolRequest(testConfig, poolToSave)).promise())
            .then(res => service.execute(testConfig, "Non Existent Pool"))
            .then(res => {
                this.fail(Error("We expected to not find a pool, but found one."));
                done();
            })
            .catch(err => {
                expect(err.message).toBe("Could not find pool with the given name.");
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

function putPoolRequest(config, pool) {
    return {
        TableName: config.table,
        Item: {
            id: "POOL:" + pool.name,
            env: config.env,
            name: pool.name,
            url: pool.url,
            players: pool.players
        }
    };
}