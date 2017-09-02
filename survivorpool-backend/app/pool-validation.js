"use strict";

const assert = require("assert");
const flatmap = require("flatmap");

const ERR_NOT_NAMED = "Pool must be named.";
const ERR_UNASSIGN = "All cast-aways must be assigned.";
const ERR_DOUBLE_ASSIGN = "Cannot assign the same cast-away more than once.";
const ERR_EMPTY_PLAYER = "All players must have at least one cast-away.";
const ERR_INVALID_CONTESTANT = "All cast-aways must be in this season.";

// Possible validation errors
module.exports.ERR_NOT_NAMED = ERR_NOT_NAMED;
module.exports.ERR_UNASSIGN = ERR_UNASSIGN;
module.exports.ERR_DOUBLE_ASSIGN = ERR_DOUBLE_ASSIGN;
module.exports.ERR_EMPTY_PLAYER = ERR_EMPTY_PLAYER;
module.exports.ERR_INVALID_CONTESTANT = ERR_INVALID_CONTESTANT;

/*
 * Validates that a pool is valid. Verifies contestants against the given season.
 */
module.exports.PoolValidator = class PoolValidator {

  /*
   * Validates a pool.
   */
  validate(pool, season) {
    return new Promise((resolve, reject) => {
      try {
        poolIsNamed(pool);
        noUnassignedContestants(pool, season);
        noDoubleAssignments(pool, season);
        allPlayersHaveContestants(pool);
        allValidContestants(pool, season);
        resolve(pool);
      }
      catch (err) {
        reject(err);
      }
    });
  }
};

/*
 * Requires that a pool has a non-empty name.
 */
function poolIsNamed(pool) {
  assert(pool.name && pool.name.length > 0, ERR_NOT_NAMED);
}

/**
 * Validates all the contestants in the season are assigned in the pool.
 */
function noUnassignedContestants(pool, season) {
  var assigned = flatmap(pool.players, (p) => p.contestants.map((c) => c.name));
  season.contestants.forEach((c) => assert(assigned.indexOf(c.name) >= 0, ERR_UNASSIGN));
}

/**
 * Validates no contestant is assigned to multiple players.
 */
function noDoubleAssignments(pool, season) {
  var set = new Set(flatmap(pool.players, (p) => p.contestants.map((c) => c.name)));
  assert(set.size == season.contestants.length, ERR_DOUBLE_ASSIGN);
}

/**
 * Validates all players in the pool have at least one contestant.
 */
function allPlayersHaveContestants(pool) {
  pool.players.forEach((p) => assert(p.contestants.length > 0, ERR_EMPTY_PLAYER));
}

/**
 * Validates all contestants exist in the season.
 */
function allValidContestants(pool, season) {
  var valid = season.contestants.map((c) => c.name);
  var assigned = flatmap(pool.players, (p) => p.contestants);

  assigned.forEach((c) => assert(valid.indexOf(c.name) >= 0, ERR_INVALID_CONTESTANT));
}