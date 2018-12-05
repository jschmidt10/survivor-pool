"use strict";

const AwsConfig = require("survivorpool-core/aws-config");
const GetPoolService = require("./get-pool-service");
const AwsRequestHandler = require("./aws-request-handler");
const AWSResponse = require("./aws-response");

module.exports = class GetPoolHandler extends AwsRequestHandler {
  constructor(config = new AwsConfig()) {
    super(/pool\/(.*)/, "GET");
    this.config = config;
    this.service = new GetPoolService();
  }

  invokeService(path, body, callback) {
    let pathParts = path.split("/");
    let poolName = decodeURIComponent(pathParts[pathParts.length - 1]);

    this.service
      .execute(this.config, poolName)
      .then(res => callback(null, AWSResponse(200, res)))
      .catch(err => callback(null, AWSResponse(400, err)));
  }
};
