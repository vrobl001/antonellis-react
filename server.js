const express = require('express');
const logger = require('morgan');
const serveFavicon = require('serve-favicon');
const path = require('path');
const port = process.env.PORT || 3001;

const app = express();

require('dotenv').config();
require('./config/database');

app.use(logger('dev'));
app.use(express.json());

app.use(serveFavicon(path.join(__dirname, 'build', 'favicon.ico')));
app.use(express.static(path.join(__dirname, 'build')));

app.use(require('./config/auth'));
app.use('/api/user', require('./routes/api/user'));
app.use('/api/food', require('./routes/api/food'));
app.use('/api/blog', require('./routes/api/blog'));
app.use('/api/profile', require('./routes/api/profile'));

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(port, function () {
  console.log(`Express app listening on port ${port}`);
});
