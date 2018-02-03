'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _mongo = require('./mongo');

var _mongo2 = _interopRequireDefault(_mongo);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _cookieParser = require('cookie-parser');

var _cookieParser2 = _interopRequireDefault(_cookieParser);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _passport = require('passport');

var _passport2 = _interopRequireDefault(_passport);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

require('dotenv').config();

const LocalStrategy = require('passport-local').Strategy;

var app = (0, _express2.default)();
const env = process.env.NODE_ENV || 'dev';
app.set('port', process.env.PORT || 5000);
app.use(_bodyParser2.default.json());

// ==========================================

app.use((0, _cookieParser2.default)());
app.use(require('express-session')({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false
}));

app.use(_passport2.default.initialize());
app.use(_passport2.default.session());

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next(null);
  }
  res.json({ message: 'not authd' });
}

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var AccountSchema = new Schema({
  username: String,
  password: String
});

AccountSchema.plugin(passportLocalMongoose);

const Account = mongoose.model('Account', AccountSchema);
_passport2.default.use(new LocalStrategy(Account.authenticate()));
_passport2.default.serializeUser(Account.serializeUser());
_passport2.default.deserializeUser(Account.deserializeUser());

app.post('/login', _passport2.default.authenticate('local'), function (request, response) {
  response.json({ message: 'Logged in!' });
});

app.post('/register', function (request, response) {
  console.log('Request: \n\n', request.body);

  Account.register(new Account({ username: request.body.username }), request.body.password, function (error, account) {
    if (error) {
      response.json({ message: 'error registering' });
      return;
    }

    response.json({ message: 'registered!' });
  });
});

app.get('/protected', ensureAuthenticated, function (request, response) {
  response.json({ message: 'yo' });
});

// router.post('/register', function(req, res) {
//     Account.register(new Account({ username : req.body.username }), req.body.password, function(err, account) {
//         if (err) {
//             return res.render('register', { account : account });
//         }

//         passport.authenticate('local')(req, res, function () {
//             res.redirect('/');
//         });
//     });
// });

// ==========================================

// Serve static file from react app
app.use(_express2.default.static(__dirname + '/../../client/build'));

app.get('/', function (request, response) {
  response.sendFile(_path2.default.join(__dirname + '/../../client/build/index.html'));
});

app.get('/users', function (request, response, next) {
  response.json([{
    id: 1,
    username: 'Shanbanan'
  }, {
    id: 2,
    username: 'Mashoo'
  }]);
});

app.listen(app.get('port'), function () {
  console.log('---> node env: ', env);

  _mongo2.default.setConnectionDetails({
    dbUsername: process.env.MONGO_USERNAME,
    dbPassword: process.env.MONGO_PASSWORD,
    dbAddress: process.env.MONGO_ADDRESS,
    dbPort: process.env.MONGO_PORT,
    dbInstance: process.env.MONGO_INSTANCE
  });

  _mongo2.default.makeConnection(function (error) {
    if (error) {
      console.log('no db');
    }
  });

  console.log("Node app is running at localhost:" + app.get('port'));
});