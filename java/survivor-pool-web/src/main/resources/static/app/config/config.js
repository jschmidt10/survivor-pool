var module = angular.module('survivor.config', [ ]);

module.factory('appConfig', function() {
    return {
        rest: {
//              getPools: 'pool/search',
//              fetchSeason: 'season/current',
//              createPool: 'pool'
              getPools: 'https://inzpqeqt93.execute-api.us-east-1.amazonaws.com/prod/FindPoolByName',
              fetchSeason: 'https://inzpqeqt93.execute-api.us-east-1.amazonaws.com/prod/FetchCurrentSeason',
              createPool: 'https://inzpqeqt93.execute-api.us-east-1.amazonaws.com/prod/CreatePool'
           }
    };
});