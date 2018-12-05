"use strict";

const AwsConfig = require("survivorpool-core/aws-config");
const ListPoolsService = require("./list-pools-service");
const AwsRequestHandler = require("./aws-request-handler");
const AWSResponse = require("./aws-response");

module.exports = class ListPoolsHandler extends AwsRequestHandler {
  constructor(config = new AwsConfig()) {
    super(/pool$/, "GET");
    this.config = config;
    this.service = new ListPoolsService();
  }

  invokeService(path, body, callback) {
    this.service
      .execute(this.config)
      .then(res => callback(null, AWSResponse(200, res)))
      .catch(err => callback(null, AWSResponse(400, err)));
  }
};
