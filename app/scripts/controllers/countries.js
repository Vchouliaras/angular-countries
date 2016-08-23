'use strict';

/**
 * @ngdoc function
 * @name angularCountriesApp.controller:CountriesCtrl
 * @description
 * # CountriesCtrl
 * Controller of the angularCountriesApp
 */
angular.module('angularCountriesApp')
  .controller('CountriesCtrl', ['$rootScope', '$scope','$log','CountriesApi','$routeParams', 'COUNTRIES_REST_ENDPOINT','CountriesAvailableImages','$q','$mdDialog','NgMap','$mdMedia',
    function($rootScope, $scope, $log, CountriesApi, $routeParams,COUNTRIES_REST_ENDPOINT, CountriesAvailableImages, $q, $mdDialog, NgMap, $mdMedia) {

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

    // Add support for fusion Tables
    // more info https://developers.google.com/maps/documentation/javascript/fusiontableslayer
    $scope.addFusionTablesLayerNgMap = function(map) {
      $scope.layer = new window.google.maps.FusionTablesLayer({
        query: {
          select: 'geometry',
          from: '1N2LBk4JHwWpOY4d9fobIn27lfnZ5MDy-NoqqRpk',
          where: 'ISO_2DIGIT IN (\'' + $scope.alpha2Code + '\')'
        },
        styles: [{
          polygonOptions: {
            strokeColor: "#FF0000",
            strokeOpacity:"0.40",
            strokeWeight:"1",
            fillColor:"#FF0000",
            fillOpacity: "0.35"
          }
        }]
      });
      $scope.layer.setMap(map);
    };

    // Trigger Google Map resize to tackle display issue
    // and initialize center.
    $scope.initializeNgMap = function(map, zoom) {
      var coord = map.getCenter();
      window.google.maps.event.trigger(map, "resize");
      map.setCenter(new window.google.maps.LatLng(coord.lat(), coord.lng()));
      map.setZoom(zoom);
    };

    // Remove fusion tables.
    $scope.removeFusionTablesLayerNgMap = function(layer){
      layer.setMap(null);
    };

    // Adds support for dialogs in countries with Google Maps intergration.
    $scope.showOnMapDialog = function($event, alpha2Code, coordinates, name, capital, area) {
      $mdDialog.show({
         parent: angular.element(document.body),
         targetEvent: $event,
         scope: $scope,
         preserveScope: true,
         clickOutsideToClose: true,
         escapeToClose: true,
         bindToController: true,
         template:
           '<md-dialog aria-label="List dialog" flex="60">' +
           '  <md-dialog-content>'+
                '<ng-map styles="{{ mapStyle }}" style="height:370px;" center="{{ coordinates }}" zoom="4" mayTypeId="TERRAIN"></ng-map>' +
           '  </md-dialog-content>' +
           '  <md-dialog-actions layout-align="space-between center">' +
           ' <div class="country-info">' +
             '{{ country }} ' +
           ' </div>' +
           '    <md-button ng-click="closeDialog()">' +
           '      Close' +
           '    </md-button>' +
           '  </md-dialog-actions>' +
           '</md-dialog>',
         controller: function($scope, $mdDialog) {
          $scope.coordinates = coordinates[0] + ' ' + coordinates[1];
          $scope.country = name + ', ' + capital;
          $scope.alpha2Code = alpha2Code;
          $scope.area = area;
          $scope.mapStyle = [{"featureType":"water","elementType":"geometry.fill","stylers":[{"color":"#d3d3d3"}]},{"featureType":"transit","stylers":[{"color":"#808080"},{"visibility":"off"}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"visibility":"on"},{"color":"#b3b3b3"}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#ffffff"}]},{"featureType":"road.local","elementType":"geometry.fill","stylers":[{"visibility":"on"},{"color":"#ffffff"},{"weight":1.8}]},{"featureType":"road.local","elementType":"geometry.stroke","stylers":[{"color":"#d7d7d7"}]},{"featureType":"poi","elementType":"geometry.fill","stylers":[{"visibility":"on"},{"color":"#ebebeb"}]},{"featureType":"administrative","elementType":"geometry","stylers":[{"color":"#a7a7a7"}]},{"featureType":"road.arterial","elementType":"geometry.fill","stylers":[{"color":"#ffffff"}]},{"featureType":"road.arterial","elementType":"geometry.fill","stylers":[{"color":"#ffffff"}]},{"featureType":"landscape","elementType":"geometry.fill","stylers":[{"visibility":"on"},{"color":"#efefef"}]},{"featureType":"road","elementType":"labels.text.fill","stylers":[{"color":"#696969"}]},{"featureType":"administrative","elementType":"labels.text.fill","stylers":[{"visibility":"on"},{"color":"#737373"}]},{"featureType":"poi","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"poi","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"road.arterial","elementType":"geometry.stroke","stylers":[{"color":"#d6d6d6"}]},{"featureType":"road","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{},{"featureType":"poi","elementType":"geometry.fill","stylers":[{"color":"#dadada"}]}];
          $scope.closeDialog = function() {
            $mdDialog.hide();
          };
        },
        onShowing: function($scope) {
          NgMap.getMap().then(function(map) {
            var zoom = ($scope.area < 1000) ? 10 : ($scope.area > 2000000) ? 3 : 4 ;
            $scope.addFusionTablesLayerNgMap(map);
            $scope.initializeNgMap(map, zoom);
          });
        },
        onRemoving: function() {
           NgMap.getMap().then(function() {
              $scope.removeFusionTablesLayerNgMap($scope.layer);
           });
        },
      });
    };


    // Track different media queries with $mdMedia service.
    $scope.$watch(
      function() {
        return $mdMedia('xs') ? 'xs' :
          $mdMedia('sm') ? 'sm' : 'lg';
      },
      function(breakpoint) {
        if (breakpoint === 'xs') {
          $scope.repsonsiveFlex = {
            'flex': '0 1 300px'
          };
        }
        else {
          $scope.repsonsiveFlex = {
            'flex': '0 1 265px'
          };
        }
      }
    );


  }]);
