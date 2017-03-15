var module = angular.module('survivor.find', [ 'survivor.config' ]);

module.controller('FindController', [ '$scope', '$http', 'appConfig',
		function($scope, $http, appConfig) {
			$http.get(appConfig.rest.getPools).success(function(results) {
				if (results.success) {
					$scope.pools = results.data;
				}
			});
		} ]);