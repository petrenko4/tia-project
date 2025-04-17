var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var tracksRouter = require('./routes/api_v1/tracks');
var releasesRouter = require('./routes/api_v1/releases');
var authRouter = require('./routes/api_v1/auth');

var app = express();
var cors = require('cors');

app.use(cors({
        origin: 'http://localhost:5173'
}))
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/uploads', express.static(path.join(__dirname, 'routes/uploads')));
app.use('/users', usersRouter);
app.use('/api/v1/tracks', tracksRouter);
app.use('/api/v1/releases', releasesRouter);
app.use('/api/v1/auth', authRouter);

module.exports = app;
