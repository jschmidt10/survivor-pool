"use strict";

const DynamoFactory = require("survivorpool-core/aws-dynamo-factory");
const AWSConfig = require("survivorpool-core/aws-config");
const fs = require("fs");

let config = new AWSConfig();
let dynamo = DynamoFactory.newInstance();

fs.readFile("current_season.json", (err, data) => {
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
