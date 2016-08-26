'use strict';

/**
 * @ngdoc overview
 * @name angularCountriesApp
 * @description
 * # angularCountriesApp
 *
 * Main module of the application.
 */

angular.module('angularCountriesApp', ['ngAnimate','ngResource','ngRoute','ngMaterial','ngMap','ngCountries.services', 'ngCountries.filters'])

  .constant('COUNTRIES_REST_ENDPOINT', 'https://restcountries.eu/rest/v1')

  .run(['$rootScope', '$window', function($rootScope, $window) {
    $rootScope.$on('$routeChangeSuccess', function() {
      // angular.element('md-content').scrollTo(0,0);
    });
  }])

  .config(['$mdThemingProvider', function($mdThemingProvider){
    // Configure default material theme
    $mdThemingProvider
      .theme('indigo')
      .primaryPalette('indigo');
    $mdThemingProvider
      .setDefaultTheme('indigo');
  }])

  .config(['$compileProvider', function($compileProvider){
    $compileProvider.debugInfoEnabled(false);
  }])

  .config(['$locationProvider', function($locationProvider){
    //Activate HTML5 Mode.
    $locationProvider.html5Mode(true);
  }])

  .config(['$routeProvider', function($routeProvider){
      var originalWhen = $routeProvider.when.bind($routeProvider);
      $routeProvider.when = function(paths, routes) {
        if (!angular.isArray(paths)) {
          paths = [paths];
        }
        paths.forEach(function (path) {
          originalWhen(path, routes);
        });
        return $routeProvider;
      };
  }])

  .config(['$routeProvider','$httpProvider',
    function ($routeProvider, $httpProvider) {
      // Configure route provider.
      $routeProvider
        .when(['/', '/region/:region'], {
          templateUrl: 'views/main.html',
          controller: 'CountriesCtrl',
          controllerAs: 'countries',
        })
        .otherwise({
          redirectTo: '/'
        }
      );
    }
  ]);
