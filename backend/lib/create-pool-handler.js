"use strict";

const AwsRequestHandler = require("./aws-request-handler");
const AWSResponse = require("./aws-response");

const core = require("survivorpool-core");
const AwsConfig = core.AwsConfig;
const CreatePoolService = core.CreatePoolService;

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