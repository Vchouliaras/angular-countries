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
    'ngTouch',
    'ngMaterial'
  ])
  .config(['$routeProvider','$mdThemingProvider', function ($routeProvider, $mdThemingProvider) {
    // Configure default material theme
    $mdThemingProvider
      .theme('indigo')
      .primaryPalette('indigo');
    $mdThemingProvider
      .setDefaultTheme('indigo');

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
  // Register contast variable.
  .constant('COUNTRIES_REST_ENDPOINT', 'https://restcountries.eu/rest/v1')
  // Register an $https service to get data form API.
  .factory('CountriesApi',['$http', 'COUNTRIES_REST_ENDPOINT', function($http, COUNTRIES_REST_ENDPOINT) {
    var $$httpCountriesApiParameteres = {
      'method': 'GET',
      'cache': true,
      'url': COUNTRIES_REST_ENDPOINT,
    };
    return {
      getAllCountries: function() {
        $$httpCountriesApiParameteres.url += '/all';
        return $http($$httpCountriesApiParameteres);
      },
      getCountry: function(country) {
        $$httpCountriesApiParameteres.url += '/' + country;
        return $http($$httpCountriesApiParameteres);
      },
      getLangCode: function(code) {
        $$httpCountriesApiParameteres.url += '/lang/' + code;
        return $http($$httpCountriesApiParameteres);
      },
      getCurrency: function(currency) {
        $$httpCountriesApiParameteres.url += '/currency/' + currency;
        return $http($$httpCountriesApiParameteres);
      },
      getRegion: function(region) {
        $$httpCountriesApiParameteres.url += '/region/' + region;
        return $http($$httpCountriesApiParameteres);
      },
      getCapitalCity: function(capital) {
        $$httpCountriesApiParameteres.url += '/capital/' + capital;
        return $http($$httpCountriesApiParameteres);
      },
    };
  }]);
