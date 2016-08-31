'use strict';

// Here we define a test suite.
describe('Main Controller', function () {

  var MainCtrl, scope, passPromise, countriesApi;


  var Countries = [
    {name : 'Germany',capital: 'Berlin', currencies:['EUR'], population: 20000000, area: 2000},
    {name: 'Greece', capital: 'Athens', currencies:['USD'], population: 10000000, area: 1000}];

  // Load the controller's module.
  beforeEach(module('angularCountriesApp'));

  // Override a service.
  beforeEach(module(function($provide) {
    $provide.factory('CountriesApi', function($q) {
      var restCountries = jasmine.createSpy('restCountries').and.callFake(function(parameter) {
        if (passPromise && parameter) {
          return $q.resolve(Countries);
        }
        else {
          return $q.reject('Countries could not be loaded.');
        }
      });

      return {
        restCountries: function(parameter) {
          return restCountries(parameter);
        }
      };
    });
  }));

  // Load the controller.
  beforeEach(inject(function ($controller, $rootScope, CountriesApi) {
    scope = $rootScope.$new();
    countriesApi = CountriesApi;
    console.log(countriesApi);
    MainCtrl = $controller('AppMainCtrl', {
      $scope: scope
    });
  }));

  // Populate scope.
  beforeEach(function(){
    scope.Countries = scope.CountriesTemp = Countries;
  });

  it('should load REST Countries', function() {
    var data;
    passPromise = true;
    countriesApi.restCountries({region: 'africa'})
      .then(function(response) {
        data = response;
      });

    // Trigger digest
    // to get updated values.
    scope.$digest();

    expect(data).toEqual(Countries);
  });

  it('should appear the search input on click', function(){
    scope.SearchInput.appear = false;
    scope.toggleSearch();
    expect(scope.SearchInput.appear).toBe(true);
  });

  // @TODO need to write a custom matcher for more results.
  it('should contain \"Greece\" when I search the term \"Gre\" in search input', function() {
    scope.selectedSearchInputTerm('Gre');
    expect(scope.Countries[0].name).toContain('Greece');
  });

  it('should sort from High to Low when the corresponding option is selected, in population filter', function() {
    scope.selectedPopulationFilterChanged('from_high_to_low');
    expect(scope.Countries[0].population).toBe(20000000);
  });

  it('should sort from Big to Small when the corresponding option is selected,in area filter', function() {
    scope.selectedAreaFilterChanged('from_big_to_small');
    expect(scope.Countries[0].area).toBe(2000);
  });

  it('should display countries with the corresponding currencies when EUR is selected, on currencies filter', function() {
    scope.selectedCurrencyFilterChanged(["EUR"]);
    expect(scope.Countries[0].currencies[0]).toMatch('EUR');
  });
});
