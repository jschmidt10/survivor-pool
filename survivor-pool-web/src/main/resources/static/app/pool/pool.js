var module = angular.module('survivor.pool', []);

module.controller('PoolController', [
		'$scope',
		'$http',
		'$routeParams',
		function($scope, $http, $routeParams) {
			var fetchUrl = "pool";
			var poolName = $routeParams.name;

			$http.get(fetchUrl, {
				params : {
					name : poolName
				}
			}).success(
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