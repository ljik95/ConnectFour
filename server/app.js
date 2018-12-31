const express = require('express');
const app = express();
const path = require('path');
const morgan = require('morgan');

app.use(express.static(path.join(__dirname, '../public')))

// api routes
app.use('/api', require('./api'));

// Logging middleware
app.use(morgan('dev'));

// Body parsing middleware
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

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

app.listen(port, function () {
  console.log(`Listening on port ${port}`);
  console.log(`http://localhost:${port}/`)
});
