'use strict';

  var passPromise, Countries;
  var hola = angular.module('hola',[]);

    hola.factory('CountriesApi', function($q, CountriesHelper) {
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



 // inject(function($window) {

 // });
