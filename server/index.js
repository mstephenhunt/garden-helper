require('dotenv').config()

import express from 'express'
import db from './mongo'
import path from 'path'

var app = express()

const env = process.env.NODE_ENV || 'dev'

app.set('port', (process.env.PORT || 5000))

// Serve static file from react app
app.use(express.static(__dirname + '/../../client/build'))

app.get('/', function(request, response) {
  response.sendFile(path.join(__dirname + '/../../client/build/index.html'));
})

app.get('/users', function (request, response, next) {
  response.json([
    {
      id: 1,
      username: 'Shanbanan'
    },
    {
      id: 2,
      username: 'Mashoo'
    }
  ])
})

app.listen(app.get('port'), function() {
  console.log('---> node env: ', env)

  db.setConnectionDetails({
    dbUsername: process.env.MONGO_USERNAME,
    dbPassword: process.env.MONGO_PASSWORD,
    dbAddress: process.env.MONGO_ADDRESS,
    dbPort: process.env.MONGO_PORT,
    dbInstance: process.env.MONGO_INSTANCE
  })

  db.makeConnection(function (error) {
    if (error) {
      console.log('no db')
    }
  })

  console.log("Node app is running at localhost:" + app.get('port'))
})
