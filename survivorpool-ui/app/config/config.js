var module = angular.module('survivor.config', [ ]);

module.factory('appConfig', function() {
    return {
        rest: {
              listPools: ' https://bnwylviwi2.execute-api.us-east-1.amazonaws.com/prod/survivorpool/pool',
              getPool: ' https://bnwylviwi2.execute-api.us-east-1.amazonaws.com/prod/survivorpool/pool',
              fetchSeason: ' https://bnwylviwi2.execute-api.us-east-1.amazonaws.com/prod/survivorpool/season',
              createPool: ' https://bnwylviwi2.execute-api.us-east-1.amazonaws.com/prod/survivorpool/pool'
           }
    };
});