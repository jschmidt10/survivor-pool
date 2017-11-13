"use strict";

const rp = require("request-promise");

/*
 * This script is used to keep a Lambda REST endpoint "warm". It will do an HTTP
 * GET against the given URL.
 */

let url = process.env["URL"];

module.exports.handler = function(event, context, callback) {
  rp(url)
    .then((res) => {
      console.log(JSON.stringify(res));
      callback(null, res);
    })
    .catch((err) => {
      console.log("Error occurred.");
      console.log(JSON.stringify(err));
      callback(err, null);
    });
};