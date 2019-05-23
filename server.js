const { resolve } = require('path');
const history = require('connect-history-api-fallback');
const express = require('express');
const serverConfig = require('./server.config');
const app = express();

const { PORT = 8080 } = process.env;

// API
// - Initialize api routes
serverConfig(app);

// UI
// - Configure dist files as a public path
const publicPath = resolve(__dirname, './dist');
// - Set expiration
const staticConf = { maxAge: '1y', etag: false };




// Enable fallback to index.html from any route
app.use('/', history({
    // index: '/dist/index.html',
    index: '/index.html',
    verbose: false
}));


// - Allow access to static files (dist files) 
app.use(express.static(publicPath, staticConf));

//
// app.use('/index.html', function (req, res, next) {
//    
// });

//
// app.get('*', function(req, res, next){
//     // console.log("404 - Route not found");
//     // res.status(404).send('NOT FOUND!');
//     console.log('[last middleware] req.originalUrl', req.originalUrl);
//     next();
// });

// Go
// app.listen(PORT, () => console.log(`App running on port ${PORT}!`));
module.exports = app;

console.log('App started');