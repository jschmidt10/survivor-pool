// A season-service backed by a Lambda endpoint.
const request = require("request");

var RestSeasonService = class {
  constructor(url) {
    if (!url) {
      raise(Error("Must pass in a URL"));
    }
    this.options = {
      url: url,
      json: true,
      headers: {
        "Accept": "application/json"
      }
    }
  }

  execute(callback) {
    request(this.options, function(err, res, body) {
      callback(err, body);
    });
  }
};

exports.create = function(url) {
  return new RestSeasonService(url);
};