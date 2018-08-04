var module = angular.module('survivor.pool', [ 'survivor.config' ]);

module.controller('PoolController', [ '$scope', '$http', '$routeParams', 'appConfig',
  function($scope, $http, $routeParams, appConfig) {
    var poolName = $routeParams.name;

    function maxContestants(players) {
      var max = 0;
      players.forEach((p) => {
        if (p.contestants.length > max) {
          max = p.contestants.length;
        }
      });
      return max;
    }

    $http
      .get(appConfig.rest.getPool + "/" + poolName)
      .success(function(results) {
        $scope.pool = results;
		$scope.maxContestantsPerPlayer = maxContestants(results.players);
		console.log("max contestants = " + $scope.maxContestantsPerPlayer);
	  });
  }
]);