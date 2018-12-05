"use strict";

/*
 * Handles preprocessing of an AWS Lambda Proxy request.
 */
module.exports = class AWSRequestHandler {
  constructor(pathRegex, httpMethod, serviceCaller) {
    this.pathRegex = pathRegex;
    this.httpMethod = httpMethod;
    this.serviceCaller = serviceCaller;
  }

  /*
   * Checks if this handler can handle the given request path.
   */
  acceptsPath(event) {
    return this.pathRegex.test(event.pathParameters.proxy);
  }

  /*
   * Checks if this handler can handle the given http method.
   */
  acceptsMethod(event) {
    return this.httpMethod === event.httpMethod;
  }

  /*
   * Handles the request. Delegates to the configured processor.
   */
  handle(event, callback) {
    let path = event.pathParameters.proxy;
    var body = {};
    if (event.httpMethod == "POST" && event.body) {
      body = JSON.parse(event.body);
    }
    this.invokeService(path, body, callback);
  }
};
