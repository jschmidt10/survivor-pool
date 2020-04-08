"use strict";

const AwsRequestHandler = require("./aws-request-handler");
const AWSResponse = require("./aws-response");

const core = require("survivorpool-core");
const AwsConfig = core.AwsConfig;
const ListPoolsService = core.ListPoolsService;

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