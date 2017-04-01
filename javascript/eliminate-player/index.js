const service = require("./service");

// production config
const table = "survivorpoolv2";
const env = "prod";

var player = process.argv[2];

if (!player) {
  console.error("Must pass in a player name to eliminate.");
}
else {
  console.log("Eliminating player: " + player);
  service.execute(table, env, player, function(err, data) {
    if (err) {
      console.log("Failed to eliminate player " + player);
      console.log(JSON.stringify(err));
    }
    else {
      console.log("Successfully eliminated " + player);
    }
  });
}

