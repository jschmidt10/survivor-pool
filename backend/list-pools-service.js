"use strict";

const DynamoFactory = require("survivorpool-core/aws-dynamo-factory");

module.exports = class ListPoolsService {

  constructor() {
    this.dynamo = DynamoFactory.newInstance();
  }

  /*
   * Gets the current season.
   */
  execute(config) {
    let request = {
      TableName: config.table,
      KeyConditionExpression: "id = :id",
      ExpressionAttributeValues: { ":id": "POOL_LIST:" + config.env }
    };

    return new Promise((resolve, reject) => {
      this
        .dynamo
        .query(request)
        .promise()
        .then((data) => resolve(maskPools(data.Items)))
        .catch((err) => reject(err));
    });
  }
};

/*
 * Masks out internal fields that we don't need.
 */
function maskPools(pools) {
  var masked = [];
  if (pools) {
    masked = pools.map((p) => ({ name: p.name, url: p.url }));
  }
  return masked;
}