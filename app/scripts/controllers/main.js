'use strict';

angular.module('angularCountriesApp')
    .controller('AppMainCtrl',
      ['$rootScope',
      '$scope',
      '$filter',
      '$log',
      '$mdSidenav',
      'CountriesApi',
      '$routeParams',
    function ($rootScope, $scope, $filter, $log, $mdSidenav, CountriesApi, $routeParams) {

    // Register filters.
    var orderByFilter = $filter('orderBy');
    var filterFilter = $filter('filter');

    // Set initial value for scope variables
    // of ng-model attribute on filters
    $scope.inputSearchTerm = {term: ''};
    $scope.selectedAreaFilter = {term: ''};
    $scope.selectedPopulationFilter = {term: ''};
    $scope.searchCurrencyTerm = {term: ''};
    $scope.selectedCurrencyFilter = {term: ''};

    // Get Countries.
    $scope.CircularBar = true;
    CountriesApi.restCountries($routeParams).then(
      function(response) {
        $scope.CircularBar = false;
        $scope.CountriesTemp = $scope.Countries = response.Countries;
        $scope.CurrencyfiltersTemp = $scope.Currencyfilters = response.Currencyfilters;
      },function(error) {
        $log.console(error);
      }
    );

    // Toggle input search field.
    $scope.SearchInput = {appear: false};
    $scope.toggleSearch = function() {
      $scope.SearchInput.appear = (!$scope.SearchInput.appear) ? true : false;
      if (!$scope.SearchInput.appear) {
        $scope.inputSearchTerm.term = '';
        $scope.selectedAreaFilter.term = '';
        $scope.selectedPopulationFilter.term = '';
        $scope.selectedCurrencyFilter.term = '';
        $scope.Countries = $scope.CountriesTemp;
      }
    };

    // Global Search for Countries and Capitals.
    $scope.selectedSearchInputTerm = function(value) {
      var expression;
      console.log($scope.CountriesTemp);
      $scope.Countries = filterFilter($scope.CountriesTemp,
        function(item) {
          expression = (item.name + ' ' + item.capital).toLowerCase().trim();
          return (expression.search(value.toLowerCase().trim()) !== -1) ? true : false;
        }
      );
    };

    // When a Population filter is selected.
    $scope.Populationfilters = ['From High to Low', 'From Low to High'];
    $scope.selectedPopulationFilterChanged = function(value) {
      value = (value === 'from_low_to_high') ? '+' : '-';
      $scope.Countries = orderByFilter($scope.Countries, value + 'population');
    };

    // When a Area filter is selected.
    $scope.Areafilters = ['From Big to Small', 'From Small to Big'];
    $scope.selectedAreaFilterChanged = function(value) {
      value = (value === 'from_small_to_big') ? '+' : '-';
      $scope.Countries = orderByFilter($scope.Countries, value + 'area');
    };

    // Clear currency term text field when closed.
    $scope.clearSearchCurrencyTerm = function(){
      $scope.searchCurrencyTerm.term = '';
    };

    // When a new Currency filter is selected.
    $scope.selectedCurrencyFilterChanged = function(value) {
      $scope.Currencyfilters = $scope.CurrencyfiltersTemp;
      $scope.Countries = $scope.CountriesTemp;
      if (value.length > 0) {
        var tempArr = [];
        angular.forEach(value, function(option) {
          tempArr = tempArr.concat(filterFilter($scope.Countries, {currencies: option}));
          // Remove duplicate values from tempArr
          // to avoid duplicate entries error.
          tempArr.filter(function(el) {
              return tempArr.indexOf(el) === -1;
            }
          );
        });
        $scope.Countries = tempArr;
      }
    };

    // Toggle Sidebar for small screens.
    $scope.toggleSideBar = function() {
      $mdSidenav('left').toggle();
    };

    // The md-select directive eats keydown events for some quick select
    // logic. Since we have a search input here, we don't need that logic.
    $scope.stopKeyDownPropagation = function() {
      document.body.querySelector('.demo-select-header').querySelector('input')
      .addEventListener('keydown', function(event) {
        event.stopPropagation();
      });
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
