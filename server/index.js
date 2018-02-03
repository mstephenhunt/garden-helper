require('dotenv').config()

import express from 'express'
import db from './mongo'
import path from 'path'

import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'
import passport from 'passport'
const LocalStrategy = require('passport-local').Strategy

var app = express()
const env = process.env.NODE_ENV || 'dev'
app.set('port', (process.env.PORT || 5000))
app.use(bodyParser.json())


// ==========================================

app.use(cookieParser())
app.use(require('express-session')({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false
}))

app.use(passport.initialize())
app.use(passport.session())

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(null); }
  res.json({ message: 'not authd' })
}

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var AccountSchema = new Schema({
    username: String,
    password: String
});

AccountSchema.plugin(passportLocalMongoose);

const Account = mongoose.model('Account', AccountSchema);
passport.use(new LocalStrategy(Account.authenticate()));
passport.serializeUser(Account.serializeUser());
passport.deserializeUser(Account.deserializeUser());

app.post('/login', passport.authenticate('local'), function(request, response) {
  response.json({ message: 'Logged in!' })
})

app.post('/register', function (request, response) {
  console.log('Request: \n\n', request.body)

  Account.register(new Account({ username: request.body.username }), request.body.password, function (error, account) {
    if (error) {
      response.json({ message: 'error registering' })
      return
    }

    response.json({ message: 'registered!' })
  })
})

app.get('/protected', ensureAuthenticated, function (request, response) {
  response.json({ message: 'yo' })
})

// ==========================================

// Serve static file from react app
app.use(express.static(__dirname + '/../../client/build'))

app.get('/', function(request, response) {
  response.sendFile(path.join(__dirname + '/../../client/build/index.html'))
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
