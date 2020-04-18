"use strict";

const core = require("survivorpool-core");

const DynamoFactory = core.DynamoFactory;
const AWSConfig = core.AWSConfig;
const SeasonService = core.SeasonService;

let config = new AWSConfig();
let dynamo = DynamoFactory.newInstance();
let seasonService = new SeasonService();

/*
 * Updates the given player to have an eliminated status.
 */
function eliminatePlayer(season, player) {
    console.log(JSON.stringify(season, 0, 4));

    let toEliminate = season.contestants.find(function (c) {
        return c.name == player;
    });

    if (toEliminate === undefined) {
        return Promise.reject(new Error("Could not find a player named " + player));
    } else {
        toEliminate.status = "eliminated";
        return Promise.resolve(season);
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