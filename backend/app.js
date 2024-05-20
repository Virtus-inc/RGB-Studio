const express = require('express');
const expressSession = require('express-session');
const authRoutes = require('./routes/auth');
const { SESSION_SECRET, IS_PRODUCTION } = require('./configs');

const app = express();

app.use(express.json());
app.use(
  expressSession({
    name: 'mosalas.sid',
    resave: false,
    saveUninitialized: false,
    secret: SESSION_SECRET,
    cookie: {
      secure: IS_PRODUCTION,
      maxAge: 1000 * 60 * 60 * 24
    }
  })
)
app.use('/auth', authRoutes)

module.exports = app;