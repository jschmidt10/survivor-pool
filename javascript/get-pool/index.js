const request = require("request");
const service = require("./service");

// production lambda config
const table = "survivorpoolv2";
const env = "prod";

// create our season service
const seasonUrl = 'https://qzhmx61j5f.execute-api.us-east-1.amazonaws.com/prod/CurrentSeason';
const seasonService = {};
seasonService.execute = function(callback) {
  request(seasonUrl, function(err, res, body) {
    callback(err, body);
  });
};

exports.handler = function(event, context, callback) {
  if (!event.body.name) {
    callback(Error("Must pass in a 'name' attribute in request."), null);
  }
  else {
    var poolName = event.body.name;

    service.execute(table, env, seasonService, poolName, function(err, data) {
      var success = false;
      var errorMessage = "";
      var data = null;

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
  }
};