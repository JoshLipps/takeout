/**
 * Module dependencies.
 */

var express = require('express'),
  routes = require('./routes'),
  http = require('http'),
  path = require('path'),
  config = require('./config/config'),
  dust = require('dustjs-linkedin'),
  cons = require('consolidate'),
  domain = config.domain,
  template_engine = 'dust',
  MongoStore = require('connect-mongo')(express),
  passport = require('./config/passport'),
  mongoose = require('mongoose');

var app = express();

//Set templating to dust consolidate style
app.engine('dust', cons.dust);

// all environments
app.set('template_engine', template_engine);
app.set('domain', domain);
app.set('port', config.port);
app.set('views', __dirname + '/views');
app.set('view engine', template_engine);
app.set()
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser());
//connect-mongo setup
app.use(express.session({
  store: new MongoStore({
    url: config.mongo.uri + "/session"
  }),
  secret: config.secret
}));

//Passport initialize
app.use(passport.initialize());
app.use(passport.session());

//Mongoose 
mongoose.connect(config.mongo.uri);


app.use(app.router);
//app.use(require('less-middleware')({ src: __dirname + '/public' }));
app.use(express.static(path.join(__dirname, 'public')));

//middleware
/*
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
*/

// development only
if ('development' == config.env) {
  app.use(express.errorHandler());
}

//app.locals.inspect = require('util').inspect;

app.get('/', routes.index);

app.post('/login',
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
  })
);

app.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});



http.createServer(app).listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'));
});