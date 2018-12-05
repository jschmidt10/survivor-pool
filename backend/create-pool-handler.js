"use strict";

const AwsConfig = require("survivorpool-core/aws-config");
const CreatePoolService = require("./create-pool-service");
const AwsRequestHandler = require("./aws-request-handler");
const AWSResponse = require("./aws-response");

module.exports = class CreatePoolHandler extends AwsRequestHandler {
  constructor(config = new AwsConfig()) {
    super(/pool$/, "POST");
    this.config = config;
    this.service = new CreatePoolService();
  }

  invokeService(path, body, callback) {
    this.service
      .execute(this.config, body)
      .then(res => callback(null, AWSResponse(200, "Ok")))
      .catch(err => callback(null, AWSResponse(400, err)));
  }
};
