'use strict';

describe('ngCountries Filters', function() {

  beforeEach(function() {
    browser.get('/');
  });

  describe('Search input filter', function(){

    it('should display one result in search input for the term \"Greece\"', function() {
      element(by.css('.search-input-icon-container')).click();
      element(by.model('inputSearchTerm.term')).sendKeys('Greece').then(function(){
        expect(element.all(by.css('.card')).count()).toBe(1);
      });
    });

    it('should display ten results in search input for the term \"ar\" on region Americas', function() {
      browser.setLocation('region/americas').then(function() {
        element(by.css('.search-input-icon-container')).click();
        element(by.model('inputSearchTerm.term')).sendKeys('ar').then(function(){
          expect(element.all(by.css('.card')).count()).toBe(10);
        });
      });
    });

  });

  describe('Currency filters', function() {

    it('should display specific number of countries when \"EUR\" filters in selected', function() {
      element(by.model('selectedCurrencyFilter.term')).click();
      element(by.model('searchCurrencyTerm.term')).sendKeys('eur').then(function() {
        expect(element.all(by.repeater('filter in Currencyfilters')).count()).toBe(1);
        element.all(by.css('md-option[ng-value=filter]')).click();
        expect(element.all(by.repeater('country in Countries')).count()).toBe(26);
      });
    });

    it('should not display any \"EUR\" filter when we are on region Americas', function() {
      browser.setLocation('region/americas').then(function() {
        element(by.model('selectedCurrencyFilter.term')).click();
        element(by.model('searchCurrencyTerm.term')).sendKeys('eur').then(function() {
          expect(element.all(by.repeater('filter in Currencyfilters')).count()).toBe(0);
        });
      })
    });
  });

  describe('Population/Area filters', function() {

    it('should display China first as the country with the biggest population', function(){
      element(by.model('selectedPopulationFilter.term')).click();
      element(by.css('md-option[value=from_high_to_low]')).click();
      expect(element(by.repeater('country in Countries').row(0)).element(by.tagName('h4')).getText()).toBe('China');
    });

  });
});
