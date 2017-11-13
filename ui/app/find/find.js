var module = angular.module('survivor.find', [ 'survivor.config' ]);

module.controller('FindController', [ '$scope', '$http', 'appConfig',
  function($scope, $http, appConfig) {
    $http
      .get(appConfig.rest.listPools)
      .success((results) => $scope.pools = results);
  }
]);