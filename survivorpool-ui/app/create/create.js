var module = angular.module('survivor.create', [ 'dndLists', 'survivor.config' ]);

module.controller('CreateController', [ '$scope', '$http', '$window', 'appConfig',
  function($scope, $http, $window, appConfig) {
    var viewPoolUrl = '#pool?name=';
			
    $scope.models = {
      selected : null,
	  players : [],
	  contestants : []
	};

	// fetch current castaways
	$http
	  .get(appConfig.rest.fetchSeason)
	  .success(function (res) {
	      // TODO: add error handling
	      $scope.models.contestants = res.contestants;
	    });

	function playerExists(playerName) {
	  var player = $scope.models.players.find(function(p) {
	    return p.name == playerName;
	  });
	  return player != null;
	}

	// Creates a new pool
	$scope.createPool = function() {
	  var params = {
	    name : $scope.poolName,
	    ownerEmail : '',
	    players : $scope.models.players
	  };

	  $http.post(appConfig.rest.createPool, params).success(function(result) {
	    // TODO: put validation errors back in
	    $window.location.href = viewPoolUrl + result.url;
	  });
	};

	// Adds a new player to the pool
	$scope.addPlayer = function(playerName) {
	  if (playerName && !playerExists(playerName)) {
	    $scope.models.players.push({
		  name : playerName,
		  contestants : []
		});
	  }
	};

	// Remove a player
	$scope.removePlayer = function(playerName) {
	  var player = $scope.models.players.find(function(p) {
	    return p.name == playerName;
	  });
	  var index = $scope.models.players.indexOf(player);

	  if (player) {
	    $scope.models.contestants = $scope.models.contestants
		  .concat(player.contestants);
		$scope.models.players.splice(index, 1);
	  }
	};
  }
]);