import mongoose from 'mongoose'

class Database {
  constructor () {
    this.dbUsername = ''
    this.dbPassword = ''
    this.dbInstance = ''
    this.dbPort = ''
  }

  setConnectionDetails (options) {
    const {
      dbUsername,
      dbPassword,
      dbInstance,
      dbPort
    } = options

    this.dbUsername = dbUsername
    this.dbPassword = dbPassword
    this.dbInstance = dbInstance
    this.dbPort = dbPort

    this.uri = 'mongodb://' + dbUsername + ':' + dbPassword + '@' + dbInstance + ':' + dbPort + '/garden-helper'
  }

  makeConnection (callback) {
    mongoose.connect(this.uri, (error) => {
      if (error) {
        callback(error)
        return
      }

      console.log('Opened connection')

      this.db = mongoose.connection
    })
  }
}

const db = new Database()

module.exports = { db }