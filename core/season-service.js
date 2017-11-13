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
        .then((data) => SeasonSchema.fromDynamo(data.Item))
        .then((season) => resolve(season))
        .catch((err) => reject(err));
    });
  }

  /*
   * Saves the season to DynamoDB.
   */
  save(config, season) {
    return new Promise((resolve, reject) => {
      this
        .dynamo
        .put(SeasonSchema.putRequest(config, season))
        .promise()
        .then((res) => resolve(SeasonSchema.fromDynamo(season)))
        .catch((err) => reject(err));
    });
  }

  /*
   * Eliminates the given contestant from the current season.
   */
  eliminate(config, contestant) {
    if (!contestant) {
      throw Error("Must pass in a contestant to eliminate.");
    }

    return new Promise((resolve, reject) => {
      this
        .get(config)
        .then((season) => findAndEliminate(season, contestant))
        .then((season) => this.save(config, season))
        .then((season) => resolve(season))
        .catch((err) => reject(err));
    });
  }
};

/*
 * Finds a contestant and updates their status to eliminate.
 */
function findAndEliminate(season, contestant) {
  let toEliminate = season.contestants.find(function (c) { return c.name == contestant; });

  if (!toEliminate) {
    throw Error("Could not find a contestant named " + player + ".");
  }
  else {
    toEliminate.status = "eliminated";
    return season;
  }
}