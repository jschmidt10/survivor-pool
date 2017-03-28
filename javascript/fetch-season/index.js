const service = require("./service");

// production lambda config
const table = "survivorpoolv2";
const env = "prod";

exports.handler = function(event, context, callback) {
  service.execute(table, env, function(err, data) {
    var success = false;
    var errorMessage = "";

    if (err) {
      console.log("Error fetching season.");
      console.log(JSON.stringify(err));
      errorMessage = err.message;
    }
    else {
      console.log("Fetched season.");
      success = true;
    }

    callback(err, {
      success: success,
      errorMessage: errorMessage,
      data: data
    });
  });
};