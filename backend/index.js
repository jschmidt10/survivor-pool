"use strict";

const core = require("survivorpool-core");
const AwsConfig = core.AwsConfig;

const CreatePoolHandler = require("./lib/create-pool-handler");
const GetPoolHandler = require("./lib/get-pool-handler");
const GetSeasonHandler = require("./lib/get-season-handler");
const ListPoolsHandler = require("./lib/list-pools-handler");
const StatusHandler = require("./lib/status-handler");
const EliminatePlayerHandler = require("./lib/eliminate-player-handler");

const AwsLambdaApp = require("./lib/aws-lambda-app");

let conf = new AwsConfig(process.env.TABLE, process.env.ENVIRONMENT);

let handlers = [
    new CreatePoolHandler(conf),
    new GetPoolHandler(conf),
    new GetSeasonHandler(conf),
    new ListPoolsHandler(conf),
    new StatusHandler(conf),
    new EliminatePlayerHandler(conf)
];

let app = new AwsLambdaApp(handlers);

module.exports.handler = function (event, context, callback) {
    app.process(event, context, callback);
};