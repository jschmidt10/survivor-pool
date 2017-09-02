"use strict";

const DefaultHandler = require("./default-handler");

/*
 * An AWS Lambda application.
 */
module.exports = class AWSLambdaApp {
  constructor(handlers) {
    this.handlers = handlers;
    this.notFoundHandler = new DefaultHandler(404, "Not Found");
    this.methodNotAllowedHandler = new DefaultHandler(405, "Method Not Allowed");
  }

  /*
   * Process a request with the configured handlers.
   */
  process(event, context, callback) {
    var handler = undefined;
    let handlers = this.handlers.filter((h) => h.acceptsPath(event));
    if (handlers.length === 0) {
      handler = this.notFoundHandler;
    }
    else {
      handler = handlers.find((h) => h.acceptsMethod(event));
      if (handler == undefined) {
        handler = this.methodNotAllowedHandler;
      }
    }

    handler.handle(event, callback);
  }
};