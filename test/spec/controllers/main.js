'use strict';

// Here we define a test suite.
describe('Controller: MainCtrl', function () {

  var MainCtrl, scope;
  var Countries = [
    {name : 'Germany',capital: 'Berlin', currencies:['EUR'], population: 20000000, area: 2000},
    {name: 'Greece', capital: 'Athens', currencies:['USD'], population: 10000000, area: 1000}];

  // Load the controller's module.
  beforeEach(module('angularCountriesApp'));

  // Load the controller.
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MainCtrl = $controller('AppMainCtrl', {
      $scope: scope,
    });
  }));

  // Populate scope.
  beforeEach(function(){
    scope.Countries = Countries;
  });

  it('The Search input should appear on click', function(){
    scope.SearchInput.appear = false;
    scope.toggleSearch();
    expect(scope.SearchInput.appear).toBe(true);
  });

  // @TODO need to write a custom matcher for more results.
  it('Search should contain \"Greece\" when I search the term \"Gre\"', function() {
    scope.selectedSearchInputTerm('Gre', scope);
    expect(scope.Countries[0].name).toContain('Greece');
  });

  it('Population filter should sort from High to Low when the corresponding option is selected', function() {
    scope.selectedPopulationFilterChanged('from_high_to_low', scope);
    expect(scope.Countries[0].population).toBe(20000000);
  });

  it('Area filter should sort from Big to Small when the corresponding option is selected', function() {
    scope.selectedAreaFilterChanged('from_big_to_small', scope);
    expect(scope.Countries[0].area).toBe(2000);
  });

  it('When EUR currency is selected, only countries with corresponding currency should be displayed', function() {
    scope.selectedCurrencyFilterChanged(["EUR"], scope);
    console.log(scope.Countries);
    expect(scope.Countries[0].currencies[0]).toMatch('EUR');
  });

});
