const request = require("request");
const service = require("./service");
const seasonServiceFactory = require("./season-service");

// production lambda config
const table = "survivorpoolv2";
const env = "prod";

const seasonService = seasonServiceFactory.create('https://qzhmx61j5f.execute-api.us-east-1.amazonaws.com/prod/CurrentSeason');

exports.handler = function(event, context, callback) {
  service.execute(table, env, seasonService, event.name, function(err, data) {
    var success = false;
    var errorMessage = "";

    if (err) {
      console.log("Error getting pool.");
      console.log(JSON.stringify(err));
      errorMessage = err.message;
    }
    else {
      console.log("Pool fetched.");
      success = true;
    }

    callback(err, {
      success: success,
      errorMessage: errorMessage,
      data: data
    });
  });
};