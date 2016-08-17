'use strict';

/**
 * @ngdoc function
 * @name angularCountriesApp.controller:CountriesCtrl
 * @description
 * # CountriesCtrl
 * Controller of the angularCountriesApp
 */
angular.module('angularCountriesApp')
  .controller('CountriesCtrl', ['$scope','$log','CountriesApi','$routeParams', 'COUNTRIES_REST_ENDPOINT','CountriesAvailableImages',
    function($scope, $log, CountriesApi, $routeParams,COUNTRIES_REST_ENDPOINT, CountriesAvailableImages) {

    var fn = null;
    var parameter = null;
    var Countries = [];
    var Areafilters = [];

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
          angular.forEach(response.data, function(value, key) {
            // Remove countries with no reference flag in countries.json.
            if (CountriesAvailableImages.data[value.alpha2Code] !== undefined) {
              Countries.push(value);
              // Remove duplicates from currencies
              if (Areafilters.indexOf(value.currencies[0]) < 0) {
                Areafilters.push(value.currencies[0]);
              }
            }
          });

          // Define $scope variables.
          $scope.countries = Countries;
          $scope.$root.Areafilters = Areafilters;
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
