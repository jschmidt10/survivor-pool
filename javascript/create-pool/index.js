const service = require("./service");
const request = require("request");

// production lambda config
const table = "survivorpoolv2";
const env = "prod";

// create season service
const seasonUrl = 'https://qzhmx61j5f.execute-api.us-east-1.amazonaws.com/prod/CurrentSeason';
const seasonService = {};
seasonService.execute = function(callback) {
  request(seasonUrl, function(err, res, body) {
    callback(err, body);
  });
};

exports.handler = function(event, context, callback) {
  service.execute(table, env,seasonService, event.body, function(err, data) {
    var success = false;
    var errorMessage = "";
    var data = null;

    if (err) {
      console.log("Error creating pool.");
      console.log(JSON.stringify(err));
      errorMessage = err.message;
    }
    else {
      console.log("Pool created.");
      success = true;
    }

    callback(err, {
      success: success,
      errorMessage: errorMessage,
      data: data
    });
  });
};