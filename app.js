
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , http = require('http')
  , path = require('path')
  , store = new express.session.MemoryStore
  , dust = require('dustjs-linkedin')
  , cons = require('consolidate')
  , domain = 'localhost'
  , template_engine = 'dust';

var app = express();

//
if ('test' == app.get('env')) {
  process.env.PORT = 3001;
}


//Set templating to dust
app.engine('dust', cons.dust);

// all environments
app.set('template_engine', template_engine);
app.set('domain', domain);
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', template_engine);
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser('somesuchortheother'));
app.use(express.session({ secret: 'thereshouldbearealsecrethere', store: store }));
app.use(express.session());
app.use(app.router);
//app.use(require('less-middleware')({ src: __dirname + '/public' }));
app.use(express.static(path.join(__dirname, 'public')));

//middleware
app.use(function(req, res, next){
	if ( req.session.user ) {
		req.session.logged_in = true;
	}
	res.locals.message = req.flash();
	res.locals.session = req.session;
	res.locals.q = req.body;
	res.locals.err = false; 
	next();
});

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.locals.inspect = require('util').inspect;

app.get('/', routes.index);


http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
