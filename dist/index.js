'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)(); // var express = require('express')


app.set('port', process.env.PORT || 5000);
app.use(_express2.default.static(__dirname + '/public'));

app.get('/', function (request, response) {
  response.send('Hello World! - Staging asdflkjaslkfjsadlk');
});

app.listen(app.get('port'), function () {
  console.log("Node app is running at localhost:" + app.get('port'));
});