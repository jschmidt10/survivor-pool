var module = angular.module('survivor.config', [ ]);

module.factory('appConfig', function() {
    return {
        rest: {
              listPools: 'https://qzhmx61j5f.execute-api.us-east-1.amazonaws.com/prod/ListPools',
              getPool: 'https://qzhmx61j5f.execute-api.us-east-1.amazonaws.com/prod/GetPool',
              fetchSeason: 'https://qzhmx61j5f.execute-api.us-east-1.amazonaws.com/prod/CurrentSeason',
              createPool: 'https://qzhmx61j5f.execute-api.us-east-1.amazonaws.com/prod/NewPool'
           }
    };
});