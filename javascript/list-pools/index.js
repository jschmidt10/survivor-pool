const service = require("./service");

// production lambda config
const table = "survivorpoolv2";
const env = "prod";

exports.handler = function(event, context, callback) {
  service.execute(table, env, function(err, data) {
    var success = false;
    var errorMessage = "";

    if (err) {
      console.log("Error listing pools.");
      console.log(JSON.stringify(err));
      errorMessage = err.message;
    }
    else {
      console.log("Pools listed successfully.");
      success = true;
    }

    callback(err, {
      success: success,
      errorMessage: errorMessage,
      data: data
    });
  });
};