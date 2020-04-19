var angular = require("angular");
var module = angular.module("survivor.config", []);

module.factory("appConfig", () => {
    return {
        rest: {
            createPool: "{{ROOT_URL}}/pool",
            eliminateContestant: "{{ROOT_URL}}/eliminate",
            fetchSeason: "{{ROOT_URL}}/season",
            getPool: "{{ROOT_URL}}/pool",
            listPools: "{{ROOT_URL}}/pool"
        }
    };
});