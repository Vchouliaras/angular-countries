'use strict';

/**
 * @ngdoc overview
 * @name angularCountriesApp
 * @description
 * # angularCountriesApp
 *
 * Main module of the application.
 */
angular
  .module('angularCountriesApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .constant('COUNTRIES_REST_ENDPOINT', 'https://restcountries.eu/rest/v1')
  .config(['$routeProvider', '$httpProvider', function ($routeProvider) {
    // Configure route provider.
    $routeProvider
      .when('/', {
        templateUrl: 'views/countries.html',
        controller: 'CountriesCtrl',
        controllerAs: 'countries'
        // @TODO
        // resolve: {
        //   async: function(){
            // return the promise object of the call,
            // which has data in it.
        //   }
        // }
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .otherwise({
        redirectTo: '/'
      });
  }])
  .factory('CountriesApi',['$http', 'COUNTRIES_REST_ENDPOINT', function($http, COUNTRIES_REST_ENDPOINT) {
    return {
      getAllCountries: function() {
        return $http.get(COUNTRIES_REST_ENDPOINT + '/all');
      },
      getCountry: function(country) {
        return $http.get(COUNTRIES_REST_ENDPOINT + '/' + country);
      },
      getLangCode: function(code) {
        return $http.get(COUNTRIES_REST_ENDPOINT + '/lang/' + code);
      },
      getCurrency: function(currency) {
        return $http.get(COUNTRIES_REST_ENDPOINT + '/currency/' + currency);
      },
      getRegion: function(region) {
        return $http.get(COUNTRIES_REST_ENDPOINT + '/region/' + region);
      },
      getCapitalCity: function(capital) {
        return $http.get(COUNTRIES_REST_ENDPOINT.url + '/capital/' + capital);
      },
    };
  }]);
