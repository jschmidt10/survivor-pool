"use strict";

/*
 * Houses the errors associated with PoolValidator.
 */
module.exports = {
  NOT_NAMED: "Pool must be named.",
  UNASSIGN: "All cast-aways must be assigned.",
  DOUBLE_ASSIGN: "Cannot assign the same cast-away more than once.",
  EMPTY_PLAYER: "All players must have at least one cast-away.",
  INVALID_CONTESTANT: "All cast-aways must be in this season."
};