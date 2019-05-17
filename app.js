// ============
// Dependencies
// ===========
const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const i18n = require("i18n");
const jwt = require('jsonwebtoken');

// Database
const mongoose = require('mongoose');

// Session & Login
const passport = require('passport');
const session = require("express-session");

//Optimization & security
const compression = require('compression');
const helmet = require('helmet');

// Flash notifications
const flash = require('express-flash-notification');``

// Security
const cors = require('cors');


const User = require('./app/models/user.model').User;


// =======
// Local dependencies
// =======
// Routers
const indexRoutes = require('./app/routes/index.routes');
const securityRoutes = require('./app/routes/security.routes');
const adminRoutes = require('./app/routes/admin.routes');
const recursoRoutes = require('./app/routes/recurso.routes');
const unidadesRoutes = require('./app/routes/unidadAdministrativa.routes');
const calculoRoutes = require('./app/routes/calculo.routes');
const accountRoutes = require('./app/routes/account.routes');
// const usersRoutes = require('./app/routes/users.routes');

const supplierRoutes = require('./app/routes/supplier.routes');
const resourceRoutes = require('./app/routes/resource.routes');
const administrativeUnitRoutes = require('./app/routes/administrativeUnit.routes');
const calculationRoutes = require('./app/routes/calculation.routes');
const contractRoutes = require('./app/routes/contract.routes');
const userRoutes = require('./app/routes/users.routes');
const organizationRoutes = require('./app/routes/organization.routes');


const dataLoadRoutes = require('./app/routes/dataLoad.routes');
const routeLogRoutes = require('./app/routes/routeLog.routes');
const fileRoutes = require('./app/routes/file.routes');
const settingsRoutes = require('./app/routes/settings.routes');

//public api
const publicOrganizationsRoutes = require('./app/routes/publicOrganization.routes');
const publicSupplierRoutes = require('./app/routes/publicSupplier.routes');
const publicContractRoutes = require('./app/routes/publicContract.routes');
const publicComparationRoutes = require('./app/routes/publicComparation.routes');
const landingRoutes = require('./app/routes/landing.routes');

// Controllers
const securityController = require('./app/controllers/security.controller');

// Other
const config = require('./config/config').get();
const isProd = require('./config/config').isProd();
const logger = require('./app/components/logger').instance;
const passportManger = require('./app/components/passportManager');
const seedsManager = require('./app/components/seedsManager');

const {USER_PERMISSIONS_DICT} = require('./app/models/user.model');

// ============
// Configuration
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

i18n.configure({
    locales:['es'],
    directory: process.cwd() + '/app/locales',
    autoReload: config.behavior.i18nAutoReload,
    defaultLocale: 'es'
});

// =============
// ExpressJS App
// =============
const app = express();

// =================
// App settings & configuration
// =================
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Initialize PassportJS
// passportManger.init();
app.use(passport.initialize());
app.use(passport.session());

// Ensure database basic config
seedsManager.init();

// ===========
// Middlewares
// ===========
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(i18n.init);
app.use(cookieParser(config.session.options.secret));
app.use(express.static(path.join(__dirname, 'public')));

app.use(compression());
app.use(helmet());

if (!isProd) {
    //CORS always on for dev mode
    app.use(cors({
        origin: function (origin, callback) {
            //Allow cors for localhost
            // if (origin.indexOf('localhost') !== -1) {
                callback(null, true)
            // } else {
            //     callback(new Error('Not allowed by CORS'))
            // }
        }
    }));
} else {
    app.use(cors({
        origin: function (origin, callback) {
            //Allow cors for hosts that include 'karewa'
            //if (origin.indexOf('karewa') !== -1) {
                callback(null, true)
            //} else {
            //    callback(new Error('Not allowed by CORS'))
            //}
        }
    }));
}

app.use((req, res, next) => {
    //Read X-CURRENT-ORGANIZATION-ID header
    req.currentOrganizationId = req.headers['x-current-organization-id'];
    next();
});

// ======================
// Routes without session
// ======================
app.use('/', indexRoutes);
///public-api/suppliers/list 
app.use('/public-api/accounts', accountRoutes);
app.use('/public-api/organizations', publicOrganizationsRoutes);
app.use('/public-api/suppliers', publicSupplierRoutes);
app.use('/public-api/contracts', publicContractRoutes);

app.use('/public-api/route-logs', routeLogRoutes);
app.use('/public-api/files', fileRoutes);
app.use('/public-api/comparations', publicComparationRoutes);
app.use('/public-api/landing', landingRoutes);

// ======================
// Session initialization
// ======================
app.use(session(config.session.options));
app.use(flash(app));

// app.use(passport.initialize());
// app.use(passport.session());

app.use(securityController.loadUserSession);

// ======================
// Routes with session
// ======================
// app.use('/api/users', usersRoutes);
// app.use('/security', securityRoutes);
app.use('/admin', securityController.checkLogin, adminRoutes);
app.use('/api/resources', securityController.checkLogin, securityController.checkPermission(USER_PERMISSIONS_DICT.RESOURCES), resourceRoutes);
app.use('/api/calculos', securityController.checkLogin, securityController.checkPermission(USER_PERMISSIONS_DICT.CALCULATIONS), calculoRoutes);
app.use('/api/suppliers', securityController.checkLogin, securityController.checkPermission(USER_PERMISSIONS_DICT.SUPPLIERS), supplierRoutes);
app.use('/api/users', securityController.checkLogin, securityController.checkPermission(USER_PERMISSIONS_DICT.USERS), userRoutes);
//Note: Organizations can be loaded (/list) without permission, to be used in /select-organization
app.use('/api/organizations', securityController.checkLogin, securityController.checkPermission(USER_PERMISSIONS_DICT.ORGANIZATIONS), organizationRoutes);
//TODO Leave just one
app.use('/api/administrative-units', securityController.checkLogin, securityController.checkPermission(USER_PERMISSIONS_DICT.ADMINISTRATIVE_UNITS), administrativeUnitRoutes);
app.use('/api/administrativeUnits', securityController.checkLogin, securityController.checkPermission(USER_PERMISSIONS_DICT.ADMINISTRATIVE_UNITS), administrativeUnitRoutes);
app.use('/api/calculations', securityController.checkLogin, securityController.checkPermission(USER_PERMISSIONS_DICT.CALCULATIONS), calculationRoutes);
app.use('/api/contracts', securityController.checkLogin, securityController.checkPermission(USER_PERMISSIONS_DICT.CONTRACTS), contractRoutes);
app.use('/api/data-load', securityController.checkLogin, securityController.checkPermission(USER_PERMISSIONS_DICT.CONTRACTS), dataLoadRoutes);
app.use('/api/settings', securityController.checkLogin, securityController.checkPermission(USER_PERMISSIONS_DICT.SETTINGS), settingsRoutes);


app.get('*', function(req, res){
    console.log("404 - Route not found");
    res.status(404).send('NOT FOUND!');
});

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
    let isDev = req.app.get('env') === 'development';
    res.locals.error = isDev ? err : {};
    
    if (isDev && err) {
        console.log(err);
    }

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

logger.info(null, null, 'app', 'App started');

module.exports = app;
