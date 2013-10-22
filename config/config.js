var config = {}


config.mongo = {};


config.mongo.uri = process.env.MONGOLAB_URI||'mongodb://localhost';
config.port = process.env.PORT || 3000;
config.env = process.env.NODE_ENV || 'development';
config.secret = process.env.COOKIE_SECRET || '1234567890QWERTY';



//Enviroment specific settings
if('production' == config.env){
	config.domain = 'yawnneko.com'
} else if ('test' == config.env) {
 //this is so unit tests don't collide with dev
  config.port = 3001;
  config.domain = 'localhost'
  config.mongo.uri ='mongodb://localhost/test';

} else {
	config.domain = 'localhost'
	config.mongo.uri ='mongodb://localhost';
} 

console.log("Config: "+config.env+" mode.");
console.log("Config: Port - "+config.port);
console.log("Config: "+config.mongo.uri);

module.exports = config;