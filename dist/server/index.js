'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _dummyPrint = require('./dummy-print');

var _dummyPrint2 = _interopRequireDefault(_dummyPrint);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

require('dotenv').config();

var app = (0, _express2.default)();

const env = process.env.NODE_ENV || 'dev';

app.set('port', process.env.PORT || 5000);
app.use(_express2.default.static(__dirname + '/public'));

app.get('/', function (request, response) {
  response.send('Hello World -- Production!');
});

app.listen(app.get('port'), function () {
  console.log('---> node env: ', env);

  (0, _dummyPrint2.default)();

  console.log("Node app is running at localhost:" + app.get('port'));
});