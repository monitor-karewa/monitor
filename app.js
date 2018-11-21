// ============
// Dependencies
// ===========
const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

// Database
const mongoose = require('mongoose');

// =======
// Local dependencies
// =======
// Routers
const indexRoutes = require('./app/routes/index.routes');
const usersRoutes = require('./app/routes/users.routes');

// Values
const config = require('./config/config').get();


// ============
// Database configuration
// ============
// Compatibility of MongoDB >=3.6 with Mongoose < v5.0.0
mongoose.plugin(schema => {
    schema.options.usePushEach = true
});

// Native promises in Mongoose
mongoose.Promise = Promise;

// Connect
mongoose.connect(config.mongo.url, config.mongo.connectionOptions);
mongoose.connection.on("open", function () {
    //TODO: Use logger
    console.log("MongoDB connection opened");
});

// =============
// ExpressJS App
// =============
const app = express();

// =================
// App configuration
// =================
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// ===========
// Middlewares
// ===========
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


// ======
// Routes
// ======
app.use('/', indexRoutes);
app.use('/users', usersRoutes);


// ==============
// Error handling
// ==============
// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
