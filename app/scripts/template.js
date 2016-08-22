angular.module('angularCountriesApp').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('views/directives/menu-link.html',
    "<md-button class=\"menu-link-button\"> <a class=\"md-button\" ng-href=\"#/{{ itemData.route }}\"> <span flex layout=\"row\"> {{ itemData.name }} </span> </a> </md-button>"
  );


  $templateCache.put('views/directives/menu-toggle.html',
    "<md-button class=\"menu-toggle-button\" ng-click=\"toggleOpen()\"> <span flex layout=\"row\"> {{ itemData.name }}<span flex></span> <md-icon ng-class=\"{opened: isOpen, closed: !isOpen}\" class=\"button-md-icon\" md-svg-icon=\"/images/svg-icons/ic_keyboard_arrow_down_black_24px.svg\" aria-label=\"Icon Down\"></md-icon> </span> </md-button> <ul ng-show=\"isOpen\" class=\"menu-list-expanded menu-list\" ng-if=\"isDefinedVariable(itemData.pages)\"> <li ng-repeat=\"expandedItem in itemData.pages\"> <menu-link item-data=\"expandedItem\"></menu-link> </li> </ul>"
  );


  $templateCache.put('views/includes/filters.html',
    "<div layout=\"row\" layout-padding layout-align=\"start center\" class=\"content-filters\"> <md-input-container flex=\"20\" ng-show=\"!SearchInput.appear\"> <label>Filter by Currency</label> <md-select ng-model=\"selectedCurrencyFilter\" ng-change=\"selectedCurrencyFilterChanged(selectedCurrencyFilter)\" md-on-close=\"clearSearchCurrencyTerm()\" md-on-open=\"stopKeyDownPropagation()\" data-md-container-class=\"selectCurrenciesSelectHeader\" multiple> <md-select-header class=\"demo-select-header\"> <input ng-model=\"searchCurrencyTerm.term\" type=\"search\" placeholder=\"Search for currencies...\" class=\"demo-header-searchbox md-text\"> </md-select-header> <md-optgroup label=\"Currencyfilters\"> <md-option ng-value=\"filter\" ng-repeat=\"filter in Currencyfilters | filter:searchCurrencyTerm.term \">{{filter}}</md-option> </md-optgroup> </md-select> </md-input-container> <md-input-container flex=\"20\" ng-show=\"!SearchInput.appear\"> <label>Sort By Population</label> <md-select ng-model=\"selectedPopulationFilter\" ng-change=\"selectedPopulationFilterChanged(selectedPopulationFilter)\"> <md-option ng-value=\"filter | spacesToDashes\" ng-repeat=\"filter in Populationfilters\" value=\"{{filter}}\">{{filter}}</md-option> </md-select> </md-input-container> <md-input-container flex=\"20\" ng-show=\"!SearchInput.appear\"> <label>Sort By Area</label> <md-select ng-model=\"selectedAreaFilter\" ng-change=\"selectedAreaFilterChanged(selectedAreaFilter)\"> <md-option ng-value=\"filter | spacesToDashes\" ng-repeat=\"filter in Areafilters\" value=\"{{filter}}\">{{filter}}</md-option> </md-select> </md-input-container> <md-input-container class=\"search-input-field-container\" ng-show=\"SearchInput.appear\"> <input ng-keyup=\"selectedSearchInputTerm(inputSearchTerm)\" ng-model=\"inputSearchTerm\" type=\"text\" placeholder=\"Search for Country or Capital\"> </md-input-container> <md-input-container class=\"search-input-icon-container\"> <md-icon md-svg-src=\"/images/svg-icons/ic_clear_black_24px.svg\" ng-show=\"SearchInput.appear\" ng-click=\"toggleSearch()\"></md-icon> <md-icon md-svg-src=\"/images/svg-icons/ic_search_black_24px.svg\" ng-show=\"!SearchInput.appear\" ng-click=\"toggleSearch()\"></md-icon> </md-input-container> </div>"
  );


  $templateCache.put('views/includes/footer.html',
    "<div class=\"footer\" layout=\"row\" flex=\"noshrink\" layout-align=\"center center\"> <div id=\"license\">&copy; <a href=\"https://iam.vchouliaras.com\" target=\"_blank\">vchouliaras</a></div> </div>"
  );


  $templateCache.put('views/includes/header.html',
    "<header class=\"nav-header\"> <a ng-href=\"/#/\" class=\"header-link\" href=\"/#/\"> <img src=\"images/world.svg\" alt=\"Globe\" class=\"globe-logo\"> <h1 class=\"md-heading\">World Countries</h1> </a> </header> <md-divider></md-divider>"
  );


  $templateCache.put('views/includes/menu.html',
    "<ul class=\"menu-list\"> <li ng-repeat=\"item in menu\"> <menu-link item-data=\"item\" ng-if=\"item.type === 'link'\"></menu-link> <menu-toggle item-data=\"item\" ng-if=\"item.type === 'toggle'\"></menu-toggle> </li> <md-divider></md-divider> </ul>"
  );


  $templateCache.put('views/includes/toolbar.html',
    "<div class=\"angular-logo\" flex> <md-icon md-svg-src=\"/images/angular-logo.svg\" aria-label=\"Angular Logo\" class=\"md-icon-angular-logo\"></md-icon> <h4>ngCountries</h4> </div> <div class=\"preview-on-github\" flex> <a href=\"https://github.com/vchouliaras/angular-countries\" target=\"_blank\"> <md-icon md-svg-src=\"/images/github-logo.svg\" aria-label=\"Github Logo\" class=\"md-icon-github-logo\"></md-icon> </a> </div>"
  );


  $templateCache.put('views/main.html',
    "<div layout=\"row\" layout-align=\"none center\" layout-wrap class=\"countries-cards\"> <md-card ng-repeat=\"country in Countries\" flex=\"none\" class=\"card\"> <md-card-header class=\"md-card-header\"> <h4 class=\"md-headline\">{{ country.name }}</h4> </md-card-header> <md-card-content class=\"md-card-content\"> <img width=\"265\" ng-src=\"images/flags/{{ country.alpha2Code | lowercase }}.png\" class=\"md-card-image\" alt=\"{{ country.name }}\"> </md-card-content> <md-card-actions layout=\"row\" layout-align=\"end center\" class=\"md-card-actions\"> <md-button class=\"on-map\" ng-click=\"showOnMapDialog($event, country.alpha2Code, country.latlng, country.name, country.capital)\"><md-icon md-svg-src=\"/images/svg-icons/ic_place_black_24px.svg\"></md-icon> ON MAP</md-button> <md-card-icon-actions> <md-button ng-href=\"https://en.wikipedia.org/wiki/{{country.name}}\" target=\"_blank\" title=\"{{country.name}} in Wikipedia\" class=\"md-icon-button\" aria-label=\"icon\"> <md-icon md-svg-src=\"/images/svg-icons/ic_school_black_24px.svg\"></md-icon> </md-button> </md-card-icon-actions> </md-card-actions> </md-card> </div>"
  );

}]);
