const async = require("async");
const validator = require("../validator");

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

  it("should fail when pool is not named", function(done) {
    var pool = newTestPool();
    pool.name = "";
    validator.validate(season, pool, function(err, data) {
      expect(err.message).toBe(validator.ERR_NOT_NAMED);
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
                 { name: "Contestant3" },
               ]
             },
             {
               name: "Tina",
               contestants: [
                 { name: "Contestant4" },
                 { name: "Contestant5" },
                 { name: "Contestant6" },
               ]
             }
           ]
         };
}