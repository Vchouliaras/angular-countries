'use strict';

/**
 * @ngdoc function
 * @name angularCountriesApp.controller:CountriesCtrl
 * @description
 * # CountriesCtrl
 * Controller of the angularCountriesApp
 */
angular.module('angularCountriesApp')
  .controller('CountriesCtrl', ['$scope','$log','CountriesApi','$routeParams','CountriesAvailableImages', 'COUNTRIES_REST_ENDPOINT',
    function($scope, $log, CountriesApi, $routeParams, CountriesAvailableImages, COUNTRIES_REST_ENDPOINT) {

    var fn, parameter = null;
    if ($routeParams.region) {
      fn = 'getRegion';
      parameter = $routeParams.region;
    }
    else if ($routeParams.country) {
      fn = 'getCountry';
      parameter = $routeParams.country;
    }
    else {
      fn = 'getAllCountries';
    }

    CountriesApi[fn].call(this, parameter).then(
      function(response) {
        if (response && response.data.length > 0) {
          $scope.countries = [];
          // Remove countries with no reference flag in countries.json
          angular.forEach(response.data, function(value, key) {
            if (CountriesAvailableImages.data[value.alpha2Code] !== undefined) {
              $scope.countries.push(value);
            }
          });
        }
      },
      function(error) {
        $log.error('An error occured fetching data from ',
          COUNTRIES_REST_ENDPOINT,
          error
        );
      }
    );
  }]);
