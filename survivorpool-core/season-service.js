"use strict";

const DynamoFactory = require("./aws-dynamo-factory");
const SeasonSchema = require("./season-dynamo-schema");

/*
 * Service for fetching and saving the current Survivor season.
 */
module.exports = class SeasonService {

  constructor() {
    this.dynamo = DynamoFactory.newInstance();
  }

  /*
   * Gets the current season.
   */
  get(config) {
    return new Promise((resolve, reject) => {
      this
        .dynamo
        .get(SeasonSchema.getRequest(config))
        .promise()
        .then((data) => SeasonSchema.fromDynamo(data))
        .then((season) => resolve(season))
        .catch((err) => reject(err));
    });
  }

  /*
   * Saves the season to DynamoDB.
   */
  save(config, season) {
    return this
      .dynamo
      .put(SeasonSchema.putRequest(config, season))
      .promise();
  }
};