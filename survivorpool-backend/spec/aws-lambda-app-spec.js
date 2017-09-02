"use strict";

const AWSResponse = require("../app/aws-response");
const AWSRequestHandler = require("../app/aws-request-handler");
const AWSLambdaApp = require("../app/aws-lambda-app");

let handler = new AWSRequestHandler(/^test$/, "GET", serviceCaller);
let app = new AWSLambdaApp([ handler ]);

describe("aws-lambda-app", function() {
  it("should return 405 with incorrect method", function(done) {
    app.process(stubEvent("test", "POST"), {}, function(err, result) {
      expect(result.statusCode).toBe(405);
      done();
    });
  });

  it("should return 404 when no handler found", function(done) {
    app.process(stubEvent("wrong", "GET"), {}, function(err, result) {
      expect(result.statusCode).toBe(404);
      done();
    });
  });

  it("should return 200 when processed", function(done) {
    app.process(stubEvent("test", "GET"), {}, function(err, result) {
      expect(result.statusCode).toBe(200);
      done();
    });
  });
});

function serviceCaller(path, body, callback) {
  callback(null, AWSResponse(200, "Ok"));
}

function stubEvent(path, method) {
  return {
    httpMethod: method,
    pathParameters: {
      proxy: path
    }
  };
}