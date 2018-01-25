'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _mongo = require('./mongo');

var _mongo2 = _interopRequireDefault(_mongo);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

require('dotenv').config();

var app = (0, _express2.default)();

const env = process.env.NODE_ENV || 'dev';

app.set('port', process.env.PORT || 5000);
app.use(_express2.default.static(__dirname + '/public'));

app.get('/', function (request, response) {
  response.send('Hello World -- Production!');
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

  console.log('---> ???: ', process.env.MONGO_USERNAME);

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