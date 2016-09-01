'use strict';

describe('ngCountries Regions', function() {

  beforeEach(function() {
    browser.get('/');
  });

  it('should contain specific result for Europe region', function(){
    browser.setLocation('region/europe').then(function() {
      expect(element.all(by.repeater('country in Countries')).count()).toBe(50);
    });
  });

  it('should contain specific result for Africa region', function(){
    browser.setLocation('region/africa').then(function() {
      expect(element.all(by.repeater('country in Countries')).count()).toBe(57);
    });
  });

  it('should contain specific result for America region', function(){
    browser.setLocation('region/americas').then(function() {
      expect(element.all(by.repeater('country in Countries')).count()).toBe(48);
    });
  });

});
