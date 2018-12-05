var angular = require("angular");
require("../../config/config");

var module = angular.module("survivor.admin.eliminate", ["survivor.config"]);

module.controller("EliminationController", [
  "$scope",
  "$http",
  "$window",
  "appConfig",
  function($scope, $http, $window, appConfig) {
    // Eliminates a player
    $scope.eliminateContestant = function() {
      // Disable any previous messages
      $scope.resultMessage = "";
      $scope.errorMessage = "";

      var params = {
        contestant: $scope.contestant,
        password: $scope.password
      };

      $http.post(appConfig.rest.eliminateContestant, params).then(
        res => {
          $scope.resultMessage = res.data;
        },
        err => {
          $scope.errorMessage = err.data;
        }
      );
    };
  }
]);
