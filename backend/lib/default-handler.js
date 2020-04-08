"use strict";

const AWSResponse = require("./aws-response");

/*
 * A request handler that accepts any request and returns
 * the configured response.
 */
module.exports = class DefaultHandler {
    constructor(statusCode, body) {
        this.response = AWSResponse(statusCode, body);
    }

    handle(event, callback) {
        callback(null, this.response);
    }
};