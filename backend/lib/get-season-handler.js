"use strict";

const AwsRequestHandler = require("./aws-request-handler");
const AWSResponse = require("./aws-response");

const core = require("survivorpool-core");
const AwsConfig = core.AwsConfig;
const SeasonService = core.SeasonService;

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