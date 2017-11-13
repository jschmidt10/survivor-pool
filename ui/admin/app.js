var survivorApp = angular.module('admin', [ 'admin.eliminate', 'ngRoute' ]);

// routes
survivorApp.config([ '$routeProvider', function($routeProvider) {
	$routeProvider.when('/', {
		templateUrl : 'admin/eliminate/eliminate.html',
		controller : 'EliminationController'
	}).otherwise({
		templateUrl : 'admin/eliminate/eliminate.html',
		controller : 'EliminationController'
	});
} ]);