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
const flash = require('express-flash-notification');

// Security
const cors = require('cors');


const User = require('./src/server/models/user.model').User;


// =======
// Local dependencies
// =======
// Routers
const indexRoutes = require('./src/server/routes/index.routes');
const securityRoutes = require('./src/server/routes/security.routes');
const adminRoutes = require('./src/server/routes/admin.routes');
const recursoRoutes = require('./src/server/routes/recurso.routes');
const unidadesRoutes = require('./src/server/routes/unidadAdministrativa.routes');
const calculoRoutes = require('./src/server/routes/calculo.routes');
const accountRoutes = require('./src/server/routes/account.routes');
// const usersRoutes = require('./src/server/routes/users.routes');

const supplierRoutes = require('./src/server/routes/supplier.routes');
const resourceRoutes = require('./src/server/routes/resource.routes');
const administrativeUnitRoutes = require('./src/server/routes/administrativeUnit.routes');
const calculationRoutes = require('./src/server/routes/calculation.routes');
const contractRoutes = require('./src/server/routes/contract.routes');
const userRoutes = require('./src/server/routes/users.routes');
const organizationRoutes = require('./src/server/routes/organization.routes');


const dataLoadRoutes = require('./src/server/routes/dataLoad.routes');
const routeLogRoutes = require('./src/server/routes/routeLog.routes');
const fileRoutes = require('./src/server/routes/file.routes');
const settingsRoutes = require('./src/server/routes/settings.routes');

//public api
const publicOrganizationsRoutes = require('./src/server/routes/publicOrganization.routes');
const publicSupplierRoutes = require('./src/server/routes/publicSupplier.routes');
const publicContractRoutes = require('./src/server/routes/publicContract.routes');
const publicComparationRoutes = require('./src/server/routes/publicComparation.routes');
const publicResourceRoutes = require('./src/server/routes/publicResource.routes');
const landingRoutes = require('./src/server/routes/landing.routes');
const contactRoutes= require('./src/server/routes/contact.routes');

// Controllers
const securityController = require('./src/server/controllers/security.controller');

// Other
const config = require('./src/server/config/config').get();
const isProd = require('./src/server/config/config').isProd();
const logger = require('./src/server/components/logger').instance;
const passportManger = require('./src/server/components/passportManager');
const seedsManager = require('./src/server/components/seedsManager');

const {USER_PERMISSIONS_DICT} = require('./src/server/models/user.model');

i18n.configure({
    locales:['es'],
    directory: process.cwd() + '/src/server/locales',
    autoReload: config.behavior.i18nAutoReload,
    defaultLocale: 'es'
});

// =============
// ExpressJS App
// =============
// const app = express();


module.exports = app => {
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
    // Ensure database basic config
    seedsManager.init();
    
    
    // =================
    // App settings & configuration
    // =================
    // view engine setup
    // app.set('views', path.join(__dirname, 'views'));
    // app.set('view engine', 'pug');
    
    // Initialize PassportJS
    // passportManger.init();
    app.use(passport.initialize());
    app.use(passport.session());
    
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
    // app.use(express.static(path.join(__dirname, 'public')));
    
    app.use(compression());
    app.use(helmet());
    
    // if (!isProd) {
    //     //CORS always on for dev mode
    //     app.use(cors({
    //         origin: function (origin, callback) {
    //             //Allow cors for localhost
    //             // if (origin.indexOf('localhost') !== -1) {
    //             callback(null, true)
    //             // } else {
    //             //     callback(new Error('Not allowed by CORS'))
    //             // }
    //         }
    //     }));
    // } else {
    //     app.use(cors({
    //         origin: function (origin, callback) {
    //             //Allow cors for hosts that include 'karewa'
    //             //if (origin.indexOf('karewa') !== -1) {
    //             callback(null, true)
    //             //} else {
    //             //    callback(new Error('Not allowed by CORS'))
    //             //}
    //         }
    //     }));
    // }
    
    app.use((req, res, next) => {
        //Read X-CURRENT-ORGANIZATION-ID header
        req.currentOrganizationId = req.headers['x-current-organization-id'];
        next();
    });
    
    // ======================
    // Routes without session
    // ======================
    // app.use('/', indexRoutes);
    ///public-api/suppliers/list 
    app.use('/public-api/accounts', accountRoutes);
    app.use('/public-api/organizations', publicOrganizationsRoutes);
    app.use('/public-api/suppliers', publicSupplierRoutes);
    app.use('/public-api/contracts', publicContractRoutes);
    
    app.use('/public-api/route-logs', routeLogRoutes);
    app.use('/public-api/files', fileRoutes);
    app.use('/public-api/comparations', publicComparationRoutes);
    app.use('/public-api/resources', publicResourceRoutes);
    app.use('/public-api/landing', landingRoutes);
    app.use('/public-api/contact', contactRoutes);

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
    app.use('/api/admin', securityController.checkLogin, adminRoutes);
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
    app.use('/api/settings/load-settings', require('./src/server/controllers/publicOrganization.controller').loadOrganizationSettings);
    app.use('/api/settings', securityController.checkLogin, securityController.checkPermission(USER_PERMISSIONS_DICT.SETTINGS), settingsRoutes);
    

    // app.get('*', function(req, res, next){
    //     // console.log("404 - Route not found");
    //     // res.status(404).send('NOT FOUND!');
    //     console.log('random middleware at the end...');
    //     next();
    // });
    
    // app.get('*', function(req, res){
    //     console.log("404 - Route not found");
    //     res.status(404).send('NOT FOUND!');
    // });
    
    // ==============
    // Error handling
    // ==============
    // catch 404 and forward to error handler
    // app.use(function (req, res, next) {
    //     var err = new Error('Not Found');
    //     err.status = 404;
    //     next(err);
    // });
    
    // error handler
    app.use(function (err, req, res, next) {
        // set locals, only providing error in development
        res.locals.message = err.message;
        let isDev = process.env.NODE_ENV !== 'production';

        console.log('isDev', isDev);
        res.locals.error = isDev ? err : {};

        if (isDev && err) {
            console.log(err);
        }

        // render the error page
        res.status(err.status || 500);
        // res.render('error');
        res.end();
    });
};

//
// logger.info(null, null, 'app', 'App started');
