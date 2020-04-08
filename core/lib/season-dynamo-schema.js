"use strict";

// The AWS key for the current survivorpool season
const seasonId = "SEASON";

/*
 * Creates a get request for the current season.
 */
module.exports.getRequest = function (config) {
    return {
        Key: {
            id: seasonId,
            env: config.env
        },
        TableName: config.table
    };
};

/*
 * Preps the season object for insert into Dynamo.
 */
module.exports.putRequest = function (config, season) {
    season.id = seasonId;
    season.env = config.env;

    return {
        TableName: config.table,
        Item: season
    };
};

/*
 * Extracts the season from the DynamoDB result.
 */
module.exports.fromDynamo = function (season) {
    var masked = {};

    if (season) {
        masked.name = season.name;
        masked.contestants = season.contestants;
    }

    return masked;
};