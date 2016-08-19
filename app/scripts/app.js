'use strict';

/**
 * @ngdoc overview
 * @name angularCountriesApp
 * @description
 * # angularCountriesApp
 *
 * Main module of the application.
 */

var services = angular.module('services',[]);
services.factory('CountriesApiIntrercept',[function() {
    return {
      request: function(config) {
        if (config.method === "GET" && config.url.indexOf('restcountries') > 0) {
          // console.log('An HTTP call started', config);
        }
        return config;
      },
      requestError: function(){

      },
      response: function(response) {
        if (response.config.method === "GET" && response.config.url.indexOf('restcountries') > 0) {
          // console.log('An HTTP call ended', $q);
        }
        return response;
      },
      responseError: function() {

      },
    };
}]);
services.factory('CountriesHelper', ['$http', 'COUNTRIES_REST_ENDPOINT', function($http, COUNTRIES_REST_ENDPOINT) {
  return {
    CountriesAvailableImages: function() {
      return $http({
        'method': 'GET',
        'cache': true,
        'url': '/images/flags/countries.json',
      });
    },
    CountriesAllData: function() {
      return $http({
        'method': 'GET',
        'cache': true,
        'url': COUNTRIES_REST_ENDPOINT,
      });
    }
  };
}]);
services.factory('CountriesApi', ['$http', 'COUNTRIES_REST_ENDPOINT', function($http, COUNTRIES_REST_ENDPOINT) {
  var $$httpCountriesApiParameteres = {
    'method': 'GET',
    'cache': true
  };
  return {
    getAllCountries: function() {
      $$httpCountriesApiParameteres.url = COUNTRIES_REST_ENDPOINT + '/all';
      return $http($$httpCountriesApiParameteres);
    },
    getCountry: function(country) {
      $$httpCountriesApiParameteres.url = COUNTRIES_REST_ENDPOINT + country;
      return $http($$httpCountriesApiParameteres);
    },
    getLangCode: function(code) {
      $$httpCountriesApiParameteres.url += '/lang/' + code;
      return $http($$httpCountriesApiParameteres);
    },
    getCurrency: function(currency) {
      $$httpCountriesApiParameteres.url = COUNTRIES_REST_ENDPOINT + currency;
      return $http($$httpCountriesApiParameteres);
    },
    getRegion: function(region) {
      $$httpCountriesApiParameteres.url = COUNTRIES_REST_ENDPOINT + '/region/' + region;
      return $http($$httpCountriesApiParameteres);
    },
    getCapitalCity: function(capital) {
      $$httpCountriesApiParameteres.url = COUNTRIES_REST_ENDPOINT + capital;
      return $http($$httpCountriesApiParameteres);
    },
  };
}]);



angular
  .module('angularCountriesApp', ['ngAnimate','ngCookies','ngResource','ngRoute','ngSanitize','ngMaterial','services'])
  .constant('COUNTRIES_REST_ENDPOINT', 'https://restcountries.eu/rest/v1')
  .config(['$mdThemingProvider', function($mdThemingProvider){
    // Configure default material theme
    $mdThemingProvider
      .theme('indigo')
      .primaryPalette('indigo');
    $mdThemingProvider
      .setDefaultTheme('indigo');
  }])
  // .config(['$compileProvider', function($compileProvider){
  //   // Remove debugging info.
  //   // $compileProvider.debugInfoEnabled(false);
  // }])
  // .config(['$locationProvider', function($locationProvider){
  //   //Activate HTML5 Mode.
  //   // $locationProvider.html5Mode(true);
  // }])
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

    $httpProvider.interceptors.push('CountriesApiIntrercept');

    // Configure route provider.
    $routeProvider
      .when(['/', '/region/:region'], {
        templateUrl: 'views/main.html',
        controller: 'CountriesCtrl',
        controllerAs: 'countries',
        resolve: {
          CountriesAvailableImages: function(CountriesHelper) {
            return CountriesHelper.CountriesAvailableImages().success(function(response) {
              return response;
            });
          }
        }
      })
      .otherwise({
        redirectTo: '/'
      });
  }])
  .filter('spacesToDashes', function() {
    return function(input) {
      return (input !== undefined) ? angular.lowercase(input).replace(/[\s]/g, '_') : '';
    };
  })
  .controller('AppMainCtrl',['$rootScope','$scope','$filter',
    function ($rootScope, $scope, $filter) {

    // Register filters.
    var orderByFilter = $filter('orderBy');
    var filterFilter = $filter('filter');

    // Toggle input search field.
    $scope.SearchInput = {appear: false};
    $scope.toggleSearch = function() {
      $scope.SearchInput.appear = (!$scope.SearchInput.appear) ? true : false;
    };

    // Search input terms.
    $scope.selectedSearchInputTerm = '';
    $scope.selectedSearchInputTerm = function(value) {
      var expression;
      $rootScope.Countries = $rootScope.CountriesTemp;
      $rootScope.Countries = filterFilter($rootScope.Countries,
        function(item) {
          expression = (item.name + ' ' + item.capital).toLowerCase().trim();
          return (expression.search(value.toLowerCase().trim()) !== -1) ? true : false;
        });
    };
    // Toggle input search field.
    $scope.SearchInput = {appear: false};
    $scope.toggleSearch = function() {
      $scope.SearchInput.appear = (!$scope.SearchInput.appear) ? true : false;
    };

    $scope.Populationfilters = ['From High to Low', 'From Low to High'];
    // When a Population filter is selected.
    $scope.selectedPopulationFilterChanged = function(value) {
      $scope.selectedAreaFilter = '';
      value = (value === 'from_low_to_high') ? '+' : '-';
      $rootScope.Countries = orderByFilter($rootScope.Countries, value + 'population');
    };

    $scope.Areafilters = ['From Big to Small', 'From Small to Big'];
    // When a Area filter is selected.
    $scope.selectedAreaFilterChanged = function(value) {
      $scope.selectedPopulationFilter = '';
      value = (value === 'from_small_to_big') ? '+' : '-';
      $rootScope.Countries = orderByFilter($rootScope.Countries, value + 'area');
    };

    $scope.searchCurrencyTerm = {term: ''};
    $scope.clearSearchCurrencyTerm = function(){
      $scope.searchCurrencyTerm.term = '';
    };

    // The md-select directive eats keydown events for some quick select
    // logic. Since we have a search input here, we don't need that logic.
    $scope.stopKeyDownPropagation = function() {
      document.body.querySelector('.demo-select-header').querySelector('input')
      .addEventListener('keydown', function(event) {
        event.stopPropagation();
      });
    };

    // When a new Currency filter is selected.
    $scope.selectedCurrencyFilterChanged = function(value) {
      var tempArr = [];
      $rootScope.Currencyfilters = $rootScope.CurrencyfiltersTemp;
      $rootScope.Countries = $rootScope.CountriesTemp;
      if (value.length > 0) {
        angular.forEach(value, function(option) {
          tempArr = tempArr
            .concat(filterFilter($rootScope.Countries, {currencies: option}))
            // Remove duplicate values.
            .filter(function(el) {
              return tempArr.indexOf(el) === -1;
            });
        });
        $rootScope.Countries = tempArr;
      }
    };

    $scope.menu = [{
      name: 'Countries',
      route: 'countries',
      type: 'link',
    },
    {
      name: 'Regions',
      type: 'toggle',
      pages: [{
        name: 'Africa',
        route: 'region/africa',
        type: 'link'
      },{
        name: 'Asia',
        route: 'region/asia',
        type: 'link'
      },
      {
        name: 'Americas',
        route: 'region/americas',
        type: 'link'
      },{
        name: 'Europe',
        route: 'region/europe',
        type: 'link'
      },
      {
        name: 'Oceania',
        route: 'region/oceania',
        type: 'link'
      }]
    }];
  }]);
