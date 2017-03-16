'use strict';

const AWS = require("aws-sdk");
const assert = require("assert");

AWS.config.update({region: "us-east-1"});

const dynamo = new AWS.DynamoDB.DocumentClient();
const seasonId = "SEASON";

// Adds the given season to DynamoDB.
//   - table    The dynamo table to use.
//   - env      The current runtime environment.
//   - season   The season to create.
//   - callback The callback to receive results or error information.
exports.execute = function(table, env, season, callback) {

  try {
    validateSeason(season);
  }
  catch (err) {
    callback(err, null);
    return;
  }

  season.id = seasonId;
  season.env = env;

  var putRequest = {
    TableName: table,
    Item: season
  };

  dynamo.put(putRequest, callback);
};

function validateSeason(season) {
  assert(season.name, "Must define a season name.");
  assert(season.contestants.length > 0, "Must have at least one contestant.");
  season.contestants.forEach(validateContestant);
}

function validateContestant(c) {
  assert(c.name, "Contestants must have a name.");
  assert(c.pic, "Contestants must have a pic.");
  assert(c.status, "Contestants must have a status.");
}