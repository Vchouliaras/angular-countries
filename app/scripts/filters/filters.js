'use strict';

var filters = angular.module('ngCountries.filters',[]);

filters
  .filter('spacesToDashes', function() {
    return function(input) {
      return (input !== undefined) ? angular.lowercase(input).replace(/[\s]/g, '_') : '';
    };
  }
);
