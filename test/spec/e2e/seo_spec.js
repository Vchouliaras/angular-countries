'use strict';

describe('ngCountries basic SEO', function() {

  beforeEach(function(){
    browser.get('/');
  });

  it('should contain a specific page title', function() {
    expect(browser.getTitle()).toEqual('An AngularJS app for World Countries');
  });

  it('should contain a only one h1 tag', function() {
    expect(element.all(by.tagName('h1')).count()).toEqual(1);
  });

  it('should contain a meta description tag', function() {
    expect(element(by.css('meta[name=keywords]')).isPresent()).toBeTruthy();
  });

});
