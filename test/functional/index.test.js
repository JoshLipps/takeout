process.env.NODE_ENV = 'test';

//based on http://redotheweb.com/2013/01/15/functional-testing-for-nodejs-using-mocha-and-zombie-js.html

var app = require('../../app'),
  assert = require('assert'),
  Browser = require('zombie'),
  http = require('http');



//Index page test
describe('index page', function() {

  //Setup an instance of the app to run functional tests against
  before(function() {
    this.server = http.createServer(app).listen(3001);

    this.browser = new Browser({
      site: 'http://localhost:3001'
    });
  });

  // load the index page before each test
  beforeEach(function(done) {
    this.browser.visit('/', done);
  });

  it('should display a menu', function() {

  });

  it('should show login form / modal', function() {
    this.browser.success.should.be.true;
    this.browser.text("form label").should.equal("EmailPassword");
  });

  it('should refuse partial submissions', function() {

  });

  it('should keep values on partial submissions', function() {

  });

  it('should refuse invalid emails', function() {

  });

  it('should accept complete submissions', function() {

  });

  after(function(done) {
    this.server.close(done);
  });


});