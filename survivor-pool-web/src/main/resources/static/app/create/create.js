var module = angular.module('survivor.create', [ 'dndLists', 'survivor.config' ]);

module.controller('CreateController', [
		'$scope',
		'$http',
		'$window',
		'appConfig',
		function($scope, $http, $window, appConfig) {
			var viewPoolUrl = '#pool?name=';
			
			$scope.models = {
				selected : null,
				players : [],
				contestants : []
			};

			// fetch current castaways
			$http.get(appConfig.rest.fetchSeason).success(function(result) {
				if (result.success) {
					$scope.models.contestants = result.data.contestants;
				}
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

				console.log(JSON.stringify(params));

				$http.post(appConfig.rest.createPool, params).success(function(result) {
					if (!result.success) {
						$scope.errorMessage = result.errorMessage;
					}
					else {
						$window.location.href = viewPoolUrl + result.data.url;
					}
				}).error(function(err) {
					console.log(arguments);	
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
		} ]);