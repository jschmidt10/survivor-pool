"use strict";

const core = require("survivorpool-core");
const AWSConfig = core.AWSConfig;
const DynamoFactory = core.DynamoFactory;
const fs = require("fs");

let config = new AWSConfig();
let dynamo = DynamoFactory.newInstance();

fs.readFile("data/current_season.json", (err, data) => {
    let season = JSON.parse(data);

    season.id = "SEASON";
    season.env = config.env;

    let putRequest = {
        TableName: config.table,
        Item: season
    };

    dynamo
        .put(putRequest)
        .promise()
        .then(res => console.log("Created season successfully!"))
        .catch(err => {
            console.log("Failed to create season.");
            console.log(JSON.stringify(err, null, 2));
        });
});