'use strict';

angular.module('angularCountriesApp')
  .directive('menuLink', function () {
    return {
      restrict: 'E',
      scope: {
        itemData: '='
      },
      templateUrl: 'views/directives/menu-link.html',
      link: function ($scope, $element, $attributes) {

      }
    };
  });
