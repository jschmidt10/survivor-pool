var survivorApp = angular.module('survivor', [ 'survivor.find',
		'survivor.pool', 'survivor.create', 'ngRoute' ]);

survivorApp.config([ '$routeProvider', function($routeProvider) {
	$routeProvider.when('/create', {
		templateUrl : 'app/create/create.html',
		controller : 'CreateController'
	}).when('/find', {
		templateUrl : 'app/find/find.html',
		controller : 'FindController'
	}).when('/pool', {
		templateUrl : 'app/pool/pool.html',
		controller : 'PoolController'
	}).otherwise({
		templateUrl : 'app/intro/intro.html'
	});
} ]);