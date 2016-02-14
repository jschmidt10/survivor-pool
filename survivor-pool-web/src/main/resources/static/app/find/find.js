var module = angular.module('survivor.find', []);

module.controller('FindController', [ '$scope', '$http',
		function($scope, $http) {
			var fetchUrl = "pool/search";

			$http.get(fetchUrl).success(function(results) {
				if (results.success) {
					$scope.pools = results.data;
				}
			});
		} ]);