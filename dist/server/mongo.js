'use strict';

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Database {
  constructor() {
    this.dbUsername = '';
    this.dbPassword = '';
    this.dbInstance = '';
    this.dbPort = '';
  }

  setConnectionDetails(options) {
    const {
      dbUsername,
      dbPassword,
      dbInstance,
      dbPort
    } = options;

    this.dbUsername = dbUsername;
    this.dbPassword = dbPassword;
    this.dbInstance = dbInstance;
    this.dbPort = dbPort;

    this.uri = 'mongodb://' + dbUsername + ':' + dbPassword + '@' + dbInstance + ':' + dbPort + '/garden-helper';
  }

  makeConnection(callback) {
    _mongoose2.default.connect(this.uri, error => {
      if (error) {
        callback(error);
        return;
      }

      console.log('Opened connection');

      this.db = _mongoose2.default.connection;
    });
  }
}

const db = new Database();

module.exports = { db };