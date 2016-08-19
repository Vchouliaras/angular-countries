'use strict';

/**
 * @ngdoc function
 * @name angularCountriesApp.controller:CountriesCtrl
 * @description
 * # CountriesCtrl
 * Controller of the angularCountriesApp
 */
angular.module('angularCountriesApp')
  .controller('CountriesCtrl', ['$rootScope', '$scope','$log','CountriesApi','$routeParams', 'COUNTRIES_REST_ENDPOINT','CountriesAvailableImages','$q','$mdDialog','NgMap',
    function($rootScope, $scope, $log, CountriesApi, $routeParams,COUNTRIES_REST_ENDPOINT, CountriesAvailableImages, $q, $mdDialog, NgMap) {

    var fn = null;
    var parameter = null;
    var Countries = [];
    var Currencyfilters = [];

    if ($routeParams.region) {
      fn = 'getRegion';
      parameter = $routeParams.region;
    }
    else if ($routeParams.country) {
      fn = 'getCountry';
      parameter = $routeParams.country;
    }
    else {
      fn = 'getAllCountries';
    }

    CountriesApi[fn].call(this, parameter).then(
      function(response) {
        if (response && response.data.length > 0) {
          angular.forEach(response.data, function(value) {
            // Remove countries with no reference flag in countries.json.
            if (CountriesAvailableImages.data[value.alpha2Code] !== undefined) {
              Countries.push(value);
              // Remove duplicates from currencies
              if (Currencyfilters.indexOf(value.currencies[0]) < 0) {
                Currencyfilters.push(value.currencies[0]);
              }
            }
          });

          // Define global $scope variables.
          $rootScope.CountriesTemp = $rootScope.Countries = Countries;
          console.log($rootScope.CountriesTemp);
          $rootScope.CurrencyfiltersTemp = $rootScope.Currencyfilters = Currencyfilters;
        }
      },
      function(error) {
        $log.error('An error occured fetching data from ',
          COUNTRIES_REST_ENDPOINT,
          error
        );
      },
      function(event) {
        console.log('Notify just called', event);
      }
    );


    // Adds support for dialogs in countries.
    $scope.showOnMapDialog = function($event, population, coordinates, name, capital) {
      var parentEl = angular.element(document.body);
      $mdDialog.show({
         parent: parentEl,
         targetEvent: $event,
         clickOutsideToClose: true,
         escapeToClose: true,
         bindToController: true,
         template:
           '<md-dialog aria-label="List dialog" flex="60">' +
           '  <md-dialog-content>'+
                '<ng-map style="height:370px;" center="{{ coordinates }}" zoom="7" mayTypeId="TERRAIN">'+
                 '<shape name="circle" no-watcher="true" stroke-color="#FF0000" stroke-opacity="0.8" stroke-weight="2" fill-color="#FF0000" fill-opacity="0.35" center="{{ coordinates }}" radius="{{ getRadius(population) }}"></shape>' +
                '</ng-map>' +
           '  </md-dialog-content>' +
           '  <md-dialog-actions>' +
           ' <div class="country-info">' +
             '{{ country }} ' +
           ' </div>' +
           '    <md-button ng-click="closeDialog()">' +
           '      Close' +
           '    </md-button>' +
           '  </md-dialog-actions>' +
           '</md-dialog>',
         controller: function($scope, $mdDialog) {
          $scope.population = population;
          $scope.coordinates = coordinates[0] + ' ' + coordinates[1];
          $scope.country = name + ', ' + capital;
          $scope.closeDialog = function() {
            $mdDialog.hide();
          };
          $scope.getRadius = function(num) {
            return Math.round(Math.sqrt(num) * 10);
          };
        },
        onShowing: function($scope) {
          NgMap.getMap().then(function(map) {
            if (window.google !== undefined) {
              var pretty = [{"featureType":"water","elementType":"geometry.fill","stylers":[{"color":"#d3d3d3"}]},{"featureType":"transit","stylers":[{"color":"#808080"},{"visibility":"off"}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"visibility":"on"},{"color":"#b3b3b3"}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#ffffff"}]},{"featureType":"road.local","elementType":"geometry.fill","stylers":[{"visibility":"on"},{"color":"#ffffff"},{"weight":1.8}]},{"featureType":"road.local","elementType":"geometry.stroke","stylers":[{"color":"#d7d7d7"}]},{"featureType":"poi","elementType":"geometry.fill","stylers":[{"visibility":"on"},{"color":"#ebebeb"}]},{"featureType":"administrative","elementType":"geometry","stylers":[{"color":"#a7a7a7"}]},{"featureType":"road.arterial","elementType":"geometry.fill","stylers":[{"color":"#ffffff"}]},{"featureType":"road.arterial","elementType":"geometry.fill","stylers":[{"color":"#ffffff"}]},{"featureType":"landscape","elementType":"geometry.fill","stylers":[{"visibility":"on"},{"color":"#efefef"}]},{"featureType":"road","elementType":"labels.text.fill","stylers":[{"color":"#696969"}]},{"featureType":"administrative","elementType":"labels.text.fill","stylers":[{"visibility":"on"},{"color":"#737373"}]},{"featureType":"poi","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"poi","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"road.arterial","elementType":"geometry.stroke","stylers":[{"color":"#d6d6d6"}]},{"featureType":"road","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{},{"featureType":"poi","elementType":"geometry.fill","stylers":[{"color":"#dadada"}]}];
              map.setOptions({styles: pretty});
              window.google.maps.event.trigger(map, "resize");
            }
          });
        },
      });
    };
  }]);
