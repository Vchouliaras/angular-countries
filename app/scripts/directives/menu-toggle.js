'use strict';

angular.module('angularCountriesApp')
  .directive('menuToggle', function () {
    return {
      restrict: 'E',
      scope: {
        itemData: '='
      },
      templateUrl: 'views/directives/menu-toggle.html',
      link: function ($scope, $element, $attributes) {
        $scope.isOpen = false;
        $scope.isDefinedVariable = function(value) {
          return typeof value !== 'undefined';
        };
        $scope.toggleOpen = function() {
          $scope.isOpen = ($scope.isOpen) ? false : true;
          $scope.$root.$broadcast('menuToggle:triggered', {
            scopeId: $scope.$id,
            isOpen: $scope.isOpen
          });
        };
      },
      controller: function($scope) {
        $scope.$root.$on('menuToggle:triggered', function(event, data) {
          if ($scope.$id !== data.scopeId) {
            if ($scope.isOpen) {
              $scope.isOpen = !data.isOpen;
            }
          }
        });
      }
    };
  });
