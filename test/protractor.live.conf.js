exports.config = {
  // The address of a running selenium server.
  seleniumAddress: 'http://localhost:4444/wd/hub',

  framework: 'jasmine',

  // Spec patterns are relative to the location of this config.
  specs: [
    'spec/e2e/*_spec.js'
  ],


  capabilities: {
    'browserName': 'chrome',
    'chromeOptions': {'args': ['--disable-extensions']}
  },


  // A base URL for your application under test. Calls to protractor.get()
  // with relative paths will be prepended with this.
  baseUrl: 'http://localhost:9000',

  rootElement: 'html',

  jasmineNodeOpts: {
    onComplete: null,
    isVerbose: true,
    showColors: true,
    includeStackTrace: true,
    defaultTimeoutInterval: 10000
  },

  // Add testing report in xml for jenkins.
  onPrepare:function() {
    'use strict';
    var jasmineReporters = require('jasmine-reporters');
    jasmine.getEnv().addReporter(
      new jasmineReporters.JUnitXmlReporter({
        savePath: 'SeleniumE2ETest/',
        consolidateAll: true,
      })
    );
  },
};
