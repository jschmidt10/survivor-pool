'use strict';

const assert = require("assert");
const flatmap = require("flatmap");

const ERR_NOT_NAMED = "Pool must be named.";
const ERR_UNASSIGN = "All cast-aways must be assigned.";
const ERR_DOUBLE_ASSIGN = "Cannot assign the same cast-away more than once.";
const ERR_EMPTY_PLAYER = "All players must have at least one cast-away.";
const ERR_INVALID_CONTESTANT = "All cast-aways must be in this season.";

// Possible validation errors
exports.ERR_NOT_NAMED = ERR_NOT_NAMED;
exports.ERR_UNASSIGN = ERR_UNASSIGN;
exports.ERR_DOUBLE_ASSIGN = ERR_DOUBLE_ASSIGN;
exports.ERR_EMPTY_PLAYER = ERR_EMPTY_PLAYER;
exports.ERR_INVALID_CONTESTANT = ERR_INVALID_CONTESTANT;

/**
 * Validates a pool using the information in the given season as truth.
 * @param season        Current season
 * @param pool          Pool to validate
 * @param callback      Callback for errors/results
 */
exports.validate = function(season, pool, callback) {
  try {
    poolIsNamed(pool);
    noUnassignedContestants(pool, season);
    noDoubleAssignments(pool, season);
    allPlayersHaveContestants(pool);
    allValidContestants(pool, season);
    callback(null, pool);
  }
  catch (err) {
    callback(err, null);
  }
};

/**
 * Validates pool is named.
 */
function poolIsNamed(pool) {
  assert(pool.name && pool.name.length > 0, ERR_NOT_NAMED);
}

/**
 * Validates all the contestants in the season are assigned in the pool.
 */
function noUnassignedContestants(pool, season) {
  var assigned = flatmap(pool.players, function(p) { return p.contestants; }).map(function(c) { return c.name; });

  season.contestants.forEach(function(c) {
    assert(assigned.indexOf(c.name) >= 0, ERR_UNASSIGN);
  });
}

/**
 * Validates no contestant is assigned to multiple players.
 */
function noDoubleAssignments(pool, season) {
  var set = new Set(flatmap(pool.players, function(p) { return p.contestants; }).map(function(c) { return c.name; }));
  assert(set.size == season.contestants.length, ERR_DOUBLE_ASSIGN);
}

/**
 * Validates all players in the pool have at least one contestant.
 */
function allPlayersHaveContestants(pool) {
  pool.players.forEach(function(player) {
    assert(player.contestants.length > 0, ERR_EMPTY_PLAYER);
  });
}

/**
 * Validates all contestants exist in the season.
 */
function allValidContestants(pool, season) {
  var valid = season.contestants.map(function (c) { return c.name; });
  var assigned = flatmap(pool.players, function(p) { return p.contestants; });

  assigned.forEach(function (contestant) {
    assert(valid.indexOf(contestant.name) >= 0, ERR_INVALID_CONTESTANT);
  });
}