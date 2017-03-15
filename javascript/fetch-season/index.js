const service = require("./service");

// production lambda config
const table = "survivorpoolv2";
const env = "prod";

exports.fetchSeason = function(event, context, callback) {
  service.execute(table, env, function(err, data) {
    if (err) {
      console.log("Error fetching season");
      console.log(JSON.stringify(err));
    }
    else {
      console.log("Fetched season");
      callback(err, data);
    }
  });
};