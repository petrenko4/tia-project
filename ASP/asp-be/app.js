var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var tracksRouter = require('./routes/api_v1/tracks');
var releasesRouter = require('./routes/api_v1/releases');
var authRouter = require('./routes/api_v1/auth');
var playlistsRouter = require('./routes/api_v1/playlists');


var session = require('express-session');
const PgSession = require("connect-pg-simple")(session);
var cookieParser = require('cookie-parser');
var pool = require('./config/db');
const {config} = require('./config/config');
var app = express();
var cors = require('cors');

if (process.env.STATUS === 'production') {
    // trust proxy needed for secure cookie to work on render.com
    // because render.com uses a reverse proxy to handle HTTPS requests
    // and forwards the requests to the backend server over HTTP
    app.set('trust proxy', 1);
}

app.use(
    session({
        store: new PgSession({
            pool, 
            tableName: "session", 
        }),        
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        name: config.session.cookieName,
        cookie: {
            secure: process.env.STATUS === 'production',
            httpOnly: true,
            sameSite: process.env.STATUS === 'production'?'none':'lax',
            maxAge: 1000 * 60 * 60 * 24 
        }            
         
    })    
); 

app.use(cors({
        origin: 'http://localhost:5173'
}))
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api/v1/tracks', tracksRouter);
app.use('/api/v1/releases', releasesRouter);
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/playlists', playlistsRouter);

module.exports = app;
