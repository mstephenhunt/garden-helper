'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

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
      dbAddress,
      dbPort,
      dbInstance
    } = options;

    this.dbUsername = dbUsername;
    this.dbPassword = dbPassword;
    this.dbAddress = dbAddress;
    this.dbPort = dbPort;
    this.dbInstance = dbInstance;

    this.uri = 'mongodb://' + dbUsername + ':' + dbPassword + '@' + dbAddress + ':' + dbPort + '/garden-helper-' + dbInstance;
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

exports.default = db;