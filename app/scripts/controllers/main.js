'use strict';

angular.module('angularCountriesApp')
    .controller('AppMainCtrl', ['$rootScope','$scope','$filter', '$mdSidenav',
    function ($rootScope, $scope, $filter, $mdSidenav) {

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
      $rootScope.Currencyfilters = $rootScope.CurrencyfiltersTemp;
      $rootScope.Countries = $rootScope.CountriesTemp;
      if (value.length > 0) {
        var tempArr = [];
        angular.forEach(value, function(option) {
          tempArr = tempArr.concat(filterFilter($rootScope.Countries, {currencies: option}));
          // Remove duplicate values from tempArr to avoid duplicate entries error.
          tempArr.filter(function(el) {
              return tempArr.indexOf(el) === -1;
            });

        });
        $rootScope.Countries = tempArr;
      }
    };

    // Toggle Sidebar for small screens.
    $scope.toggleSideBar = function() {
      $mdSidenav('left').toggle();
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
