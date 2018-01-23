require('dotenv').config()

import express from 'express'
import dummyPrint from './dummy-print'
var app = express()

const env = process.env.NODE_ENV || 'dev'

app.set('port', (process.env.PORT || 5000))
app.use(express.static(__dirname + '/public'))

app.get('/', function(request, response) {
  response.send('Hello World -- Production!')
})

app.listen(app.get('port'), function() {
  console.log('---> node env: ', env)

  dummyPrint()

  console.log("Node app is running at localhost:" + app.get('port'))
})
