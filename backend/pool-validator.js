"use strict";

const assert = require("assert");
const flatmap = require("flatmap");
const Errors = require("./pool-validator-errors.js");

/*
 * Validates survivor pools against the current season.
 */
module.exports = class PoolValidator {

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
  assert(pool.name && pool.name.length > 0, Errors.NOT_NAMED);
}

/**
 * Validates all the contestants in the season are assigned in the pool.
 */
function noUnassignedContestants(pool, season) {
  var assigned = flatmap(pool.players, (p) => p.contestants.map((c) => c.name));
  season.contestants.forEach((c) => assert(assigned.indexOf(c.name) >= 0, Errors.UNASSIGN));
}

/**
 * Validates no contestant is assigned to multiple players.
 */
function noDoubleAssignments(pool, season) {
  var set = new Set(flatmap(pool.players, (p) => p.contestants.map((c) => c.name)));
  assert(set.size == season.contestants.length, Errors.DOUBLE_ASSIGN);
}

/**
 * Validates all players in the pool have at least one contestant.
 */
function allPlayersHaveContestants(pool) {
  pool.players.forEach((p) => assert(p.contestants.length > 0, Errors.EMPTY_PLAYER));
}

/**
 * Validates all contestants exist in the season.
 */
function allValidContestants(pool, season) {
  var valid = season.contestants.map((c) => c.name);
  var assigned = flatmap(pool.players, (p) => p.contestants);

  assigned.forEach((c) => assert(valid.indexOf(c.name) >= 0, Errors.INVALID_CONTESTANT));
}