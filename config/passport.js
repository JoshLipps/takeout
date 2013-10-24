var passport = require('passport'),
  LocalStrategy = require('passport-local').Strategy;



passport.use(new LocalStrategy(
  function(username, password, done) {

    findByUsername(username, function(err, user) {
      if (err) {
        return done(err);
      }
      if (!user) {
        return done(null, false, {
          message: 'Unknown user ' + username
        });
      }
      if (user.password != password) {
        return done(null, false, {
          message: 'Invalid password'
        });
      }
      return done(null, user);
    })
    /*
    User.findOne({ username: username }, function(err, user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (!user.validPassword(password)) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    });*/
  }
));

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  //User.findOne(id, function (err, user) {
  findById(id, function(err, user) {
    done(err, user);
  });
});

//Sample Block totally usless except to test functionality. 

//Testing users !! what no salted hash? 
var users = [{
  id: 1,
  username: 'test@test.com',
  password: 'test',
  email: 'test@test.com',
  name: 'Mr. Test'
}, {
  id: 2,
  username: 'joe',
  password: 'birthday',
  email: 'joe@example.com'
}];



function findById(id, fn) {
  var idx = id - 1;
  if (users[idx]) {
    fn(null, users[idx]);
  } else {
    fn(new Error('User ' + id + ' does not exist'));
  }
}

function findByUsername(username, fn) {
  for (var i = 0, len = users.length; i < len; i++) {
    var user = users[i];
    if (user.username === username) {
      return fn(null, user);
    }
  }
  return fn(null, null);
}

module.exports = passport;