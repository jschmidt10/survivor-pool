'use strict';

const assert = require("assert");

// Validates a survivor pool. An Error will be given to the callback
// if validation fails.
//    season - the current season
//    pool - the pool to validate.
exports.validate = function(season, pool, callback) {
  console.log("Season ");
  console.log(JSON.stringify(season, null, 2));
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

function poolIsNamed(pool) {
  assert(pool.name && pool.name.length > 0, "Pool must be named.");
}

function noUnassignedContestants(pool, season) {
  var assigned = [];

  pool.players.forEach(function (player) {
    player.contestants.forEach(function (contestant) {
      assigned.push(contestant.name);
    });
  });

  season.contestants.forEach(function(c) {
    assert(assigned.indexOf(c.name) >= 0, "All cast-aways must be assigned.");
  });
}

function noDoubleAssignments(pool, season) {
  var set = new Set([]);

  pool.players.forEach(function (player) {
    player.contestants.forEach(function (contestant) {
      set.add(contestant.name);
    });
  });

  assert(set.size == season.contestants.length, "Cannot assign the same cast-away more than once.");
}

function allPlayersHaveContestants(pool) {
  pool.players.forEach(function(player) {
    assert(player.contestants.length > 0, "All players must have at least one cast-away.");
  });
}

function allValidContestants(pool, season) {
  var valid = season.contestants.map(function (c) {
    return c.name;
  });

  pool.players.forEach(function (player) {
    player.contestants.forEach(function (contestant) {
      assert(valid.indexOf(contestant.name) >= 0, "All cast-aways must be in this season.");
    });
  });
}