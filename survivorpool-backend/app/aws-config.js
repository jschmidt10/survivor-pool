"use strict";

const defaultTable = "survivorpoolv2";
const defaultEnv = "prod";

/*
 * The AWS configuration that survivorpool will use.
 */
module.exports = class AWSConfig {
  constructor(table, env) {
    this.table = (table != null ? table : defaultTable);
    this.env = (env != null ? env : defaultEnv);
  }
};