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
      dbAddress,
      dbPort,
      dbInstance
    } = options

    this.dbUsername = dbUsername
    this.dbPassword = dbPassword
    this.dbAddress = dbAddress
    this.dbPort = dbPort
    this.dbInstance = dbInstance

    this.uri = 'mongodb://' + dbUsername + ':' + dbPassword + '@' + dbAddress + ':' + dbPort + '/garden-helper-' + dbInstance
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

export default db