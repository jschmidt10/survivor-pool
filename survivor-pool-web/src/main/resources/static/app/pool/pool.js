var module = angular.module('survivor.pool', [ 'survivor.config' ]);

module.controller('PoolController', [
		'$scope',
		'$http',
		'$routeParams',
		'appConfig',
		function($scope, $http, $routeParams, appConfig) {
			var poolName = $routeParams.name;

			$http.post(appConfig.rest.getPools, {
				params : {
					name : poolName
				}
			}).success(
					function(results) {
						if (results.success && results.data.length == 1) {
							$scope.pool = results.data[0];
							$scope.maxContestantsPerPlayer = results.data[0].players
									.reduce(function(max, cur) {
										if (cur > max)
											return cur;
										else
											return max;
									});
						}
					});
		} ]);