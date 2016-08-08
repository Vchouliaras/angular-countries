'use strict';

/**
 * @ngdoc function
 * @name angularCountriesApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the angularCountriesApp
 */
angular.module('angularCountriesApp')
  .controller('CountriesCtrl', ['CountriesApi', function(CountriesApi) {
    CountriesApi.getAllCountries().then(function(response){
      console.log(response);
    });
  }]);
