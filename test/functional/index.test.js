process.env.NODE_ENV = 'test';

var app = require('../../app')
, assert = require('assert')
, Browser = require('zombie');

//Index page test
describe('index page', function() {
 
//Setup an instance of the app to run functional tests against
  before(function() {
    //this.server = http.createServer(app).listen(3001);

    this.browser = new Browser({ site: 'http://localhost:3001' });
  });
 
  // load the index page before each test
  beforeEach(function(done) {
    this.browser.visit('/', done);
  });

  it('should successfully load a page', function(){
  	 this.browser.success.should.be.true;
  });

  it('should show login form', function(){
  	this.browser.text.().should.equal('h1');
  	// 'Contact');
    //assert.equal(this.browser.text('form label'), 'First NameLast NameEmailMessage');

  });

  it('should display \'new event\' button ', function(){

  });

});