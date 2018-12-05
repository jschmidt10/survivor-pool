var survivor = angular.module('survivor',
  [
    'survivor.config',
    'survivor.find',
	'survivor.pool',
	'survivor.create',
	'survivor.admin.eliminate',
	'ngRoute'
  ]);

survivor.config([ '$routeProvider', $routeProvider => {
	$routeProvider
	  .when('/admin', {
      		templateUrl : 'app/admin/eliminate/eliminate.html',
      		controller : 'EliminationController'
      })
	  .when('/create', {
		templateUrl : 'app/create/create.html',
		controller : 'CreateController'
	  })
	  .when('/find', {
		templateUrl : 'app/find/find.html',
		controller : 'FindController'
	  })
	  .when('/pool', {
		templateUrl : 'app/pool/pool.html',
		controller : 'PoolController'
	  })
	  .otherwise({
		templateUrl : 'app/intro/intro.html'
	  });
  }
]);