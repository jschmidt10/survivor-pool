const service = require("./service");
const async = require("async");
const AWS = require("aws-sdk");

AWS.config.update({region: 'us-east-1'});

const env = "test";
const table = "survivorpoolv2";
const dynamo = new AWS.DynamoDB.DocumentClient();

var expectedSeason = {
  name: "Test Season",
  contestants: [
    { name: "Bobby", pic: "bobby.gif", status: "Active" },
    { name: "Susan", pic: "susan.gif", status: "Active" },
    { name: "Tina", pic: "tina.jpg", status: "Eliminated" }
  ]
};

var putRequest = {
  TableName: table,
  Item: {
    "id":  "SEASON",
    "name": "Test Season",
    "env": env,
    "contestants": [
        {
          "name": "Bobby",
          "pic": "bobby.gif",
          "status": true
        },
        {
          "name": "Susan",
          "pic": "susan.gif",
          "status": true
        },
        {
          "name": "Tina",
          "pic": "tina.jpg",
          "status": false
        }
      ]
  }
};

describe("Fetch Season Service", function() {

  it("returns the current season", function(done) {
    async.waterfall([
      function putItem(next) {
        dynamo.put(putRequest, next);
      },
      function testService(result, next) {
        service.execute(table, env, next);
      }
    ],
    function (err, season) {
       if(err) {
         throw (err);
       }
       else {
         expect(err).toBe(null);
         expect(season.name).toBe(expectedSeason.name);
         expect(season.contestants.length).toBe(3);
         done();
       }
    });
  });
});