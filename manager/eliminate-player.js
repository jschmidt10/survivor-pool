"use strict";

const DynamoFactory = require("survivorpool-core/aws-dynamo-factory");
const AWSConfig = require("survivorpool-core/aws-config");
const SeasonService = require("survivorpool-core/season-service");

let config = new AWSConfig();
let dynamo = DynamoFactory.newInstance();
let seasonService = new SeasonService();

/*
 * Updates the given player to have an eliminated status.
 */
function eliminatePlayer(season, player) {
  let toEliminate = season.contestants.find(function(c) {
    return c.name == player;
  });

  if (!toEliminate) {
    throw Error("Could not find a player named " + player);
  } else {
    toEliminate.status = "eliminated";
    return season;
  }
}

/*
 * Main
 */
var player = process.argv[2];

if (!player) {
  console.error("Must pass in a player name to eliminate.");
} else {
  console.log("Eliminating player: " + player);

  seasonService
    .get(config)
    .then(season => eliminatePlayer(season, player))
    .then(season => seasonService.save(config, season))
    .then(res => console.log("Successfully eliminated: " + player))
    .catch(err => {
      console.log("Failed to eliminate player " + player);
      console.log(JSON.stringify(err));
    });
}
