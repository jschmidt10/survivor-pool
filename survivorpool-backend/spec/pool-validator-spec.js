const PoolValidation = require("../pool-validation");

const validator = new PoolValidation.PoolValidator();

var season = {
  name: "Season 1",
  contestants: [
    { name: "Contestant1" },
    { name: "Contestant2" },
    { name: "Contestant3" },
    { name: "Contestant4" },
    { name: "Contestant5" },
    { name: "Contestant6" }
  ]
};

describe("Validator", function() {

  // TODO: Add other validation failures
  it("should pass when all criteria are met", function(done) {
    var pool = newTestPool();
    validator
      .validate(pool, season)
      .then((res) => done())
      .catch((err) => {
        this.fail(err);
        done();
      });
  });

  it("should fail when pool is not named", function(done) {
    var pool = newTestPool();
    pool.name = "";

    validator
      .validate(pool, season)
      .then((res) => {
        this.fail("Expected validation to fail");
        done();
      })
      .catch((err) => {
        expect(err.message).toBe(PoolValidation.ERR_NOT_NAMED);
        done();
      });
  });
});

function newTestPool() {
  return {
      name: "My Pool",
      url: "http://mypool.com",
      players: [
      {
        name: "Tommy",
        contestants: [
          { name: "Contestant1" },
          { name: "Contestant2" },
          { name: "Contestant3" }
        ]
      },
      {
        name: "Tina",
        contestants: [
          { name: "Contestant4" },
          { name: "Contestant5" },
          { name: "Contestant6" }
        ]
      }
    ]
  };
}