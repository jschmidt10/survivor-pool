var angular = require("angular");
require("../config/config");

var module = angular.module("survivor.create", ["dndLists", "survivor.config"]);

module.controller("CreateController", [
  "$scope",
  "$http",
  "$window",
  "appConfig",
  function($scope, $http, $window, appConfig) {
    var viewPoolUrl = "#!/pool?name=";

    $scope.models = {
      selected: null,
      players: [],
      contestants: []
    };

    // fetch current castaways
    $http
      .get(appConfig.rest.fetchSeason)
      .then(
        res => ($scope.models.contestants = res.data.contestants),
        err =>
          ($scope.errorMessage =
            "We could not get the current season of Survivor. Please try again soon.")
      );

    // Creates a new pool
    $scope.createPool = function() {
      var params = {
        name: $scope.poolName,
        players: $scope.models.players
      };

      $http
        .post(appConfig.rest.createPool, params)
        .then(
          res => ($window.location.href = viewPoolUrl + $scope.poolName),
          err => ($scope.errorMessage = err.data.message)
        );
    };

    function playerExists(playerName) {
      return $scope.models.players.filter(p => p.name == playerName).length > 0;
    }

    // Adds a new player to the pool
    $scope.addPlayer = function(playerName) {
      if (playerName && !playerExists(playerName)) {
        $scope.models.players.push({
          name: playerName,
          contestants: []
        });
      }
    };

    // Remove a player
    $scope.removePlayer = function(playerName) {
      var player = $scope.models.players.find(p => p.name == playerName);

      if (player) {
        var index = $scope.models.players.indexOf(player);
        $scope.models.contestants = $scope.models.contestants.concat(
          player.contestants
        );
        $scope.models.players.splice(index, 1);
      }
    };
  }
]);
