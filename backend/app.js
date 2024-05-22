const express = require('express');
const expressSession = require('express-session');
const authRoutes = require('./routes/auth');
const filesRoutes = require('./routes/files');
const usersRoutes = require('./routes/users');
const { SESSION_SECRET, IS_PRODUCTION } = require('./configs');

const app = express();

app.use(express.json());
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});
app.use(
  expressSession({
    name: 'rgb-session',
    resave: false,
    saveUninitialized: false,
    secret: SESSION_SECRET,
    cookie: {
      secure: IS_PRODUCTION,
      maxAge: 1000 * 60 * 60 * 24
    }
  })
)
app.use('/auth', authRoutes);
app.use('/', filesRoutes);
app.use('/', usersRoutes);

module.exports = app;