var angular = require("angular");

require("angular-route");
require("./config/config");
require("./admin/eliminate/eliminate");
require("./create/create");
require("./find/find");
require("./pool/pool");

var survivor = angular.module("survivor", [
    "survivor.admin.eliminate",
    "survivor.config",
    "survivor.find",
    "survivor.pool",
    "survivor.create",
    "ngRoute"
]);

survivor.config([
    "$routeProvider",
    $routeProvider => {
        $routeProvider
            .when("/admin", {
                templateUrl: "app/admin/eliminate/eliminate.html",
                controller: "EliminationController"
            })
            .when("/create", {
                templateUrl: "app/create/create.html",
                controller: "CreateController"
            })
            .when("/find", {
                templateUrl: "app/find/find.html",
                controller: "FindController"
            })
            .when("/pool", {
                templateUrl: "app/pool/pool.html",
                controller: "PoolController"
            })
            .otherwise({
                templateUrl: "app/intro/intro.html"
            });
    }
]);