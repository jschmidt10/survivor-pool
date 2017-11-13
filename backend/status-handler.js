"use strict";

const AwsRequestHandler = require("./aws-request-handler");
const AWSResponse = require("./aws-response");

module.exports = class StatusHandler extends AwsRequestHandler {
  constructor() {
    super(/status$/, "GET");
  }

  invokeService(path, body, callback) {
    let status = {
      status: "OK"
    };

    callback(null, AWSResponse(200, status));
  }
};