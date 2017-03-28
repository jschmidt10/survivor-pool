var module = angular.module('survivor.pool', [ 'survivor.config' ]);

module.controller('PoolController', [
		'$scope',
		'$http',
		'$routeParams',
		'appConfig',
		function($scope, $http, $routeParams, appConfig) {
			var poolName = $routeParams.name;

			$http.post(appConfig.rest.getPool, { name : poolName }).success(
					function(results) {
						if (results.success) {
							$scope.pool = results.data;
							$scope.maxContestantsPerPlayer = results.data.players
									.reduce(function(max, cur) {
										if (cur > max)
											return cur;
										else
											return max;
									});
						}
					});
		} ]);