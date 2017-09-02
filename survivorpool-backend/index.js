"use strict";

const CreatePoolHandler = require("./create-pool-handler");
const GetPoolHandler = require("./get-pool-handler");
const GetSeasonHandler = require("./get-season-handler");
const ListPoolsHandler = require("./list-pools-handler");
const AwsLambdaApp = require("./aws-lambda-app");

let handlers = [
  new CreatePoolHandler(),
  new GetPoolHandler(),
  new GetSeasonHandler(),
  new ListPoolsHandler()
];

let app = new AwsLambdaApp(handlers);

module.exports.handler = function(event, context, callback) {
  app.process(event, context, callback);
};