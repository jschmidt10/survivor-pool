"use strict";

const AWSResponse = require("../aws-response");

describe("aws-request", function() {
  it("should create a response from a status and body", function(done) {
    let resp = AWSResponse(200, {data: 1});

    expect(resp.statusCode).toBe(200);
    expect(resp.isBase64Encoded).toBe(true);
    expect(resp.headers["Content-type"]).toBe("application/json");
    expect(resp.body).toBe(JSON.stringify({data: 1}));
    done();
  });
});