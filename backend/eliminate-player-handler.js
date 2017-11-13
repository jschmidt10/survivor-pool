"use strict";

const AwsConfig = require("survivorpool-core/aws-config");
const SeasonService = require("survivorpool-core/season-service");

const AwsRequestHandler = require("./aws-request-handler");
const AWSResponse = require("./aws-response");

const NoAdminPassError = "The ADMIN_PASSWORD env variable was not set.";
const InvalidPassError = "The provided password was not correct.";

/*
 * Handler for requests to eliminate contestants.
 */
module.exports = class EliminatePlayerHandler extends AwsRequestHandler {
  constructor(config = new AwsConfig()) {
    super(/eliminate$/, "POST");
    this.config = config;
    this.adminPass = process.env["ADMIN_PASSWORD"];
    this.service = new SeasonService();
  }

  invokeService(path, body, callback) {
    let password = body.password;

    if (this.adminPass == undefined) {
      callback(null, AWSResponse(400, NoAdminPassError));
    }
    else if (password != this.adminPass) {
      callback(null, AWSResponse(400, InvalidPassError));
    }
    else {
      this
        .service
        .eliminate(this.config, body.contestant)
        .then((res) => callback(null, AWSResponse(200, "Successfully eliminated " + body.contestant)))
        .catch((err) => callback(null, AWSResponse(400, err)));
    }
  }
};