var module = angular.module('survivor.pool', [ 'survivor.config' ]);

module.controller('PoolController', [
		'$scope',
		'$http',
		'$routeParams',
		'appConfig',
		function($scope, $http, $routeParams, appConfig) {
			var poolName = $routeParams.name;

			$http.get(appConfig.rest.getPool, { name : poolName }).success(
					function(results) {
						$scope.pool = results;
						$scope.maxContestantsPerPlayer = results.players
								.reduce(function(max, cur) {
									if (cur > max)
										return cur;
									else
										return max;
								});
					});
		} ]);