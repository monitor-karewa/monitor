// const { resolve } = require('path');
// const history = require('connect-history-api-fallback');
const express = require('express');
const cors = require('cors');

const serverConfig = require('./server.config');
const app = express();

const { PORT = 3000 } = process.env;

//Allow cors for dev mode
app.use(cors({
    origin: function (origin, callback) {
        callback(null, true)
    }
}));

// API
// - Initialize api routes
serverConfig(app);

// UI
// - Configure dist files as a public path
// const publicPath = resolve(__dirname, './dist');
// - Set expiration
// const staticConf = { maxAge: '1y', etag: false };



//
// // Enable fallback to index.html from any route
// app.use('/', history({
//     // index: '/dist/index.html',
//     index: '/index.html',
//     verbose: false
// }));


// - Allow access to static files (dist files) 
// app.use(express.static(publicPath, staticConf));

module.exports = app;

console.log('App started');