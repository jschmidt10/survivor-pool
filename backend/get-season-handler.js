"use strict";

const AwsConfig = require("survivorpool-core/aws-config");
const SeasonService = require("survivorpool-core/season-service");
const AwsRequestHandler = require("./aws-request-handler");
const AWSResponse = require("./aws-response");

module.exports = class GetSeasonHandler extends AwsRequestHandler {
  constructor(config = new AwsConfig()) {
    super(/season$/, "GET");
    this.config = config;
    this.service = new SeasonService();
  }

  invokeService(path, body, callback) {
    this.service
      .get(this.config)
      .then(res => callback(null, AWSResponse(200, res)))
      .catch(err => callback(null, AWSResponse(400, err)));
  }
};
