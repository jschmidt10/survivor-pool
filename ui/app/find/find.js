var angular = require("angular");
require("../config/config");

var module = angular.module("survivor.find", ["survivor.config"]);

module.controller("FindController", [
  "$scope",
  "$http",
  "appConfig",
  function($scope, $http, appConfig) {
    $http
      .get(appConfig.rest.listPools)
      .then(results => ($scope.pools = results.data));
  }
]);
