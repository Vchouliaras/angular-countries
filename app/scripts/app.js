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
  .config(['$routeProvider', function ($routeProvider) {
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
    var $$httpParameteres = {
      'method': 'GET',
      'cache': true,
      'url': COUNTRIES_REST_ENDPOINT,
    };
    return {
      getAllCountries: function() {
        $$httpParameteres.url += '/all';
        return $http($$httpParameteres);
      },
      getCountry: function(country) {
        $$httpParameteres.url += '/' + country;
        return $http($$httpParameteres);
      },
      getLangCode: function(code) {
        $$httpParameteres.url += '/lang/' + code;
        return $http($$httpParameteres);
      },
      getCurrency: function(currency) {
        $$httpParameteres.url += '/currency/' + currency;
        return $http($$httpParameteres);
      },
      getRegion: function(region) {
        $$httpParameteres.url += '/region/' + region;
        return $http($$httpParameteres);
      },
      getCapitalCity: function(capital) {
        $$httpParameteres.url += '/capital/' + capital;
        return $http($$httpParameteres);
      },
    };
  }]);
