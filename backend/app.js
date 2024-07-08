const express = require('express');
const expressSession = require('express-session');
const https = require('https');
const fs = require('fs');
const authRoutes = require('./routes/auth');
const filesRoutes = require('./routes/files');
const usersRoutes = require('./routes/users');
const { SESSION_SECRET, IS_PRODUCTION } = require('./configs');

const cors = require('cors');

const options = {
  key: fs.readFileSync('/var/www/httpd-cert/vds65115.hyperhost.name_2024-07-06-20-13_39.key'),
  cert: fs.readFileSync('/var/www/httpd-cert/vds65115.hyperhost.name_2024-07-06-20-13_39.crt'),
  requestCert: false,
  rejectUnauthorized: false
};


const app = express();
const server = https.createServer(options, app).listen(5000);

app.set('trust proxy', 'loopback');

app.use(cors({
  origin: 'https://corepack.netlify.app',
  methods: [
    'GET',
    'POST',
    'PUT',
    'PATCH',
    'DELETE',
    'HEAD',
    'OPTIONS'
  ],
  credentials: true
}));
app.use(express.json());
app.use(
  expressSession({
    name: 'rgb-session',
    resave: false,
    saveUninitialized: true,
    secret: SESSION_SECRET,
    cookie: {
      sameSite: IS_PRODUCTION ? 'none' : 'lax',
      secure: IS_PRODUCTION,
      maxAge: 1000 * 60 * 60 * 24
    }
  })
)

app.use('/auth', authRoutes);
app.use('/', filesRoutes, usersRoutes);

module.exports = app;