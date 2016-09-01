'use strict';

describe('Countries Controller', function() {

  var CountriesCtrl, mdDialog, scope;

  beforeEach(module('angularCountriesApp'));

  beforeEach(inject(function($controller, $rootScope, $mdDialog) {
    scope = $rootScope.$new();
    CountriesCtrl = $controller('CountriesCtrl', {
      $scope: scope
    });

    // Spie show function of $mdDialog Service.
    spyOn($mdDialog, 'show').and.callThrough();
    mdDialog = $mdDialog;
  }));

  it('should show popup map when "\ON MAP\" is clicked', function(){
    scope.showOnMapDialog('click', 'GR', ['12', '20'], 'Greece', 'Athens', 3000);
    expect(mdDialog.show.calls.any()).toBeTruthy();
    expect(mdDialog.show.calls.count()).toEqual(1);
  });
});
