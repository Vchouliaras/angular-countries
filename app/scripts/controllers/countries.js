'use strict';

/**
 * @ngdoc function
 * @name angularCountriesApp.controller:CountriesCtrl
 * @description
 * # CountriesCtrl
 * Controller of the angularCountriesApp
 */
angular.module('angularCountriesApp')
  .controller('CountriesCtrl', ['$scope', 'CountriesApi','$log', 'COUNTRIES_REST_ENDPOINT',
    function($scope, CountriesApi, $log, COUNTRIES_REST_ENDPOINT) {
    CountriesApi.getAllCountries().then(
      function(response) {
        if (response && response.data.length > 0) {
          $scope.countries = response.data;
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
