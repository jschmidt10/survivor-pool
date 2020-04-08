"use strict";

const AWS = require("aws-sdk");

const region = "us-east-1";
const apiVersion = "2012-08-10";

const dynamodb = new AWS.DynamoDB({
    apiVersion: apiVersion,
    region: region
});

/*
 * Creates a new, pre-configured Dynamo Document Client.
 */
module.exports.newInstance = function () {
    return new AWS.DynamoDB.DocumentClient({
        service: dynamodb
    });
};