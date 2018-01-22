'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = dummyPrint;
function dummyPrint() {
  console.log('\n\n-----> hey hey \n\n');
}
'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();

const env = process.env.NODE_ENV || 'dev';

app.set('port', process.env.PORT || 5000);
app.use(_express2.default.static(__dirname + '/public'));

app.get('/', function (request, response) {
  response.send('Hello World -- Production!');
});

app.listen(app.get('port'), function () {
  console.log('---> node env: ', env);

  console.log("Node app is running at localhost:" + app.get('port'));
});
