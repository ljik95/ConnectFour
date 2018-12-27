const express = require('express');
const app = express();
const path = require('path');
const morgan = require('morgan');
const {db} = require('./db');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const dbStore = new SequelizeStore({ db: db });
const passport = require('passport');

// this means that we need to make sure our local NODE_ENV variable is in fact set to 'development'
// Node may have actually done this for you when you installed it! If not though, be sure to do that.
if (process.env.NODE_ENV === 'development') {
  require('./localSecrets'); // this will mutate the process.env object with your secrets.
}
require('./app.js')       // run your app after you're sure the env variables are set.

app.use(express.static(path.join(__dirname, '../public')))

// api routes
app.use('/api', require('./api'));

// Logging middleware
app.use(morgan('dev'));

// Body parsing middleware
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Session middleware
dbStore.sync();

app.use(session({
  secret: process.env.SESSION_SECRET || 'a wildly insecure secret',
  store: dbStore,
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

// authentication router
app.use('/auth', require('./api/auth'))

// Make sure this is right at the end of your server logic!
// The only thing after this might be a piece of middleware to serve up 500 errors for server problems
// (However, if you have middleware to serve up 404s, that go would before this as well)
app.get('*', function (req, res, next) {
  res.sendFile(path.join(__dirname, '../index.html'));
});

// 500 Error handling endware
app.use(function (err, req, res, next) {
  console.error(err);
  console.error(err.stack);
  res.status(err.status || 500).send(err.message || 'Internal server error.');
});

const port = process.env.PORT || 7777;
db.sync()  // sync our database
  .then(function(){
    app.listen(port, function () {
      console.log(`Listening on port ${port}`);
      console.log(`http://localhost:${port}/`)
    });
  })
