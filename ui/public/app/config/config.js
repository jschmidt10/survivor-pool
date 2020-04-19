var angular = require("angular");
var module = angular.module("survivor.config", []);

module.factory("appConfig", () => {
    return {
        rest: {
            createPool: "https://bnwylviwi2.execute-api.us-east-1.amazonaws.com/prod/survivorpool/pool",
            eliminateContestant: "https://bnwylviwi2.execute-api.us-east-1.amazonaws.com/prod/survivorpool/eliminate",
            fetchSeason: "https://bnwylviwi2.execute-api.us-east-1.amazonaws.com/prod/survivorpool/season",
            getPool: "https://bnwylviwi2.execute-api.us-east-1.amazonaws.com/prod/survivorpool/pool",
            listPools: "https://bnwylviwi2.execute-api.us-east-1.amazonaws.com/prod/survivorpool/pool"
        }
    };
});