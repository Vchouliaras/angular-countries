'use strict';

var services = angular.module('ngCountries.services',[]);

services
  .factory('CountriesHelper', ['$http',function($http) {
    return {
        CountriesAvailableImages: function(){
          return $http({
            'method': 'GET',
            'cache': true,
            'url': '/images/flags/countries.json',
          });
        }
      };
    }
  ])
  .factory('CountriesApi', ['$http', '$q', 'COUNTRIES_REST_ENDPOINT', 'CountriesHelper',
    function($http, $q, COUNTRIES_REST_ENDPOINT, CountriesHelper) {

      var restCountries = function(parameter) {

        var defer = $q.defer();

        var getRouteParametersUrl = function(parameter) {
          var restUrl = COUNTRIES_REST_ENDPOINT + '/all';
          if (parameter.region) {
            restUrl = COUNTRIES_REST_ENDPOINT + '/region/' + parameter.region;
          }
          else if (parameter.country) {
            restUrl = COUNTRIES_REST_ENDPOINT + '/country/' + parameter.country;
          }

          return restUrl;
        };

        var doneCallback = function(response) {
          var Countries = [];
          var Currencyfilters = [];
          if (response && response[0].data.length > 0) {
            angular.forEach(response[0].data, function(value) {
              if (response[1].data[value.alpha2Code] !== undefined) {
                Countries.push(value);
                // Remove duplicates from currencies
                if (Currencyfilters.indexOf(value.currencies[0]) < 0) {
                  Currencyfilters.push(value.currencies[0]);
                }
              }
            });
            defer.resolve({Countries: Countries, Currencyfilters: Currencyfilters});
          }
        };

        var failCallback = function() {
          defer.reject('An error occured fetching data from ' + COUNTRIES_REST_ENDPOINT);
        };

        var http = $http({
          'method': 'GET',
          'cache': true,
          'url' : getRouteParametersUrl(parameter),
        });

        // Resolve both promises.
        $q.all([http, CountriesHelper.CountriesAvailableImages()])
          .then(doneCallback, failCallback);

        return defer.promise;
      };

      return {
        restCountries: function(parameter) {
          return restCountries(parameter);
        }
      };
    }
  ]
);
