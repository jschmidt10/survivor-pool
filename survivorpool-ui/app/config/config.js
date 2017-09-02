var module = angular.module('survivor.config', [ ]);

module.factory('appConfig', function() {
    return {
        rest: {
              listPools: 'https://qzhmx61j5f.execute-api.us-east-1.amazonaws.com/prod/survivorpool/pool',
              getPool: 'https://qzhmx61j5f.execute-api.us-east-1.amazonaws.com/prod/survivorpool/pool',
              fetchSeason: 'https://qzhmx61j5f.execute-api.us-east-1.amazonaws.com/prod/survivorpool/season',
              createPool: 'https://qzhmx61j5f.execute-api.us-east-1.amazonaws.com/prod/survivorpool/pool/create'
           }
    };
});