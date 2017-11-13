var module = angular.module('survivor.pool', [ 'survivor.config' ]);

module.controller('PoolController', [ '$scope', '$http', '$routeParams', 'appConfig',
  function($scope, $http, $routeParams, appConfig) {
    var poolName = $routeParams.name;

    $http
      .get(appConfig.rest.getPool + "/" + poolName)
      .success(function(results) {
        $scope.pool = results;
		$scope.maxContestantsPerPlayer = results.players.reduce((max, cur) => Math.max(max, cur));
	  });
  }
]);