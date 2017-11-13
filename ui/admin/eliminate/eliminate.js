var module = angular.module('admin.eliminate', []);

module.controller('EliminationController', [ '$scope', '$http', '$window',
  function($scope, $http, $window) {
	// Eliminates a player
	$scope.eliminateContestant = function() {
	  var params = {
	    contestant : $scope.contestant,
	    password : $scope.password
	  };

	  $http
	    .post("https://bnwylviwi2.execute-api.us-east-1.amazonaws.com/prod/survivorpool/eliminate", params)
	    .then(
	      (res) => {
	        console.log("res = " + JSON.stringify(res));
	        $scope.resultMessage = res.data;
	      },
	      (res) => {
	        console.log("err = " + JSON.stringify(res));
	        $scope.resultMessage = res.data;
	      }
	    );
	};
  }
]);