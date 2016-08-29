'use strict';

// Here we define a test suite.
describe('Controller: MainCtrl', function () {

  var MainCtrl, scope;

  // Load the controller's module.
  beforeEach(module('angularCountriesApp'));

  // Load the controller.
  beforeEach(inject(function ($controller) {
    scope = {};
    MainCtrl = $controller('AppMainCtrl', {
      $scope: scope
    });
  }));

  it('The Search input should appear on click', function(){
    var default_value = scope.SearchInput;
    scope.toggleSearch();
    var actual_value = scope.SearchInput;
    expect(default_value.appear).toBe(actual_value.appear);
  });



});
