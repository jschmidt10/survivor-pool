"use strict";

const CreatePoolHandler = require("./lib/create-pool-handler");
const GetPoolHandler = require("./lib/get-pool-handler");
const GetSeasonHandler = require("./lib/get-season-handler");
const ListPoolsHandler = require("./lib/list-pools-handler");
const StatusHandler = require("./lib/status-handler");
const EliminatePlayerHandler = require("./lib/eliminate-player-handler");

const AwsLambdaApp = require("./lib/aws-lambda-app");

let handlers = [
    new CreatePoolHandler(),
    new GetPoolHandler(),
    new GetSeasonHandler(),
    new ListPoolsHandler(),
    new StatusHandler(),
    new EliminatePlayerHandler()
];

let app = new AwsLambdaApp(handlers);

module.exports.handler = function (event, context, callback) {
    app.process(event, context, callback);
};