"use strict";

const DynamoFactory = require("./aws-dynamo-factory");

// The AWS key for the current survivorpool season
const seasonId = "SEASON";

/*
 * Fetches the current season from AWS DynamoDB.
 */
module.exports = class GetSeasonService {

  constructor() {
    this.dynamo = DynamoFactory.newInstance();
  }

  /*
   * Gets the current season.
   */
  execute(config) {
    return new Promise((resolve, reject) => {
      this
        .dynamo
        .get(getSeasonRequest(config))
        .promise()
        .then((data) => resolve(maskSeason(data.Item)))
        .catch((err) => reject(err));
    });
  }
};

/*
 * Creates the DynamoDB get request for the season.
 */
function getSeasonRequest(config) {
  return {
    Key: {
      id: seasonId,
      env: config.env
    },
    TableName: config.table
  };
}

/*
 * Masks out the fields that we don't need.
 */
function maskSeason(season) {
  var masked = {};

  if (season) {
    masked.name = season.name;
    masked.contestants = season.contestants;
  }

  return masked;
}