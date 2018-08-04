var module = angular.module('admin.eliminate', []);

module.controller('EliminationController', [ '$scope', '$http', '$window',
  function($scope, $http, $window) {
	// Eliminates a player
	$scope.eliminateContestant = function() {
      // Disable any previous messages
      $scope.resultMessage = "";
      $scope.errorMessage = "";

	  var params = {
	    contestant : $scope.contestant,
	    password : $scope.password
	  };

	  $http
	    .post("https://bnwylviwi2.execute-api.us-east-1.amazonaws.com/prod/survivorpool/eliminate", params)
	    .then(
	      (res) => {
	        $scope.resultMessage = res.data;
	      },
	      (err) => {
	        $scope.errorMessage = err.data;
	      }
	    );
	};
  }
]);