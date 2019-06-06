const session = require("express-session");
// const mongoStore = require('connect-mongo')(session);

const mongoose = require('mongoose');

const nodeEnv = process.env.NODE_ENV;

let DEFAULT_ORGANIZATION = {
    name: "Monitor Karewa",
    shortName: "Karewa",
    color: "#19babd"
};

let DEFAULT_USER = {
    name: "Monitor",
    lastName: "Admin",
    email: "admin@app.admin",
    password: "admin",
    administratorType: 'GENERAL',
    permissions: []
};


let defaults = {
    user: DEFAULT_USER,
    organization: DEFAULT_ORGANIZATION
};

let app = {
    host: process.env.API_HOST || process.env.VUE_APP_API_HOST || 'http://localhost',
    port: process.env.API_PORT || process.env.VUE_APP_API_PORT || 8080,
    secret: process.env.APP_SECRET || 'shhhhh'
};

const config = {
    production: {
        defaults: defaults,
        app: app,
        mongo: {
            url: process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/monitor_karewa_web_dev',
            connectionOptions: {
                usePushEach: true,
                autoIndex: true, // Auto-build indexes
                reconnectTries: Number.MAX_VALUE, // Never stop trying to reconnect
                reconnectInterval: 500, // Reconnect every 500ms
                poolSize: 10, // Maintain up to 10 socket connections
                // If not connected, return errors immediately rather than waiting for reconnect
                bufferMaxEntries: 0,
                promiseLibrary: Promise, // Use native promises in the underlying MongoDB Driver
                useNewUrlParser: true //New url parser
            }
        },
        session: {
            options: {
                secret: process.env.SESSION_SECRET || "537b8537c9292f085a233789f6411f92",
                resave: false,
                saveUninitialized: false,
                // store: new mongoStore({
                //     mongooseConnection: mongoose.connection,
                //     db: process.env.MONGODB_DB || 'monitor_karewa_web_dev',
                //     touchAfter: 24 * 3600 // time period in seconds
                // }),
                cookie: {
                    path: '/',
                    httpOnly: false,
                    secure: false,
                    maxAge: null
                }
            }
        },
        behavior: {
            logLevel: 'info',
            i18nAutoReload: false,
            skipJobManager: process.env.SKIP_JOB_MANAGER || false
        },
        email: {
            stmpUser: process.env.SMTP_USER || 'monitorkarewa@gmail.com',
            stmpPass: process.env.SMTP_PASS || '',
            stmpHost: process.env.SMTP_HOST || 'smtp.gmail.com',
            stmpAccount: process.env.SMTP_ACCOUNT || 'Monitor Karewa <monitorkarewa@gmail.com>'
        }
    },
    dev: {
        defaults: defaults,
        app: app,
        mongo: {
            url: 'mongodb://127.0.0.1:27017/monitor_karewa_web_dev',
            connectionOptions: {
                usePushEach: true,
                autoIndex: true, // Auto-build indexes
                reconnectTries: Number.MAX_VALUE, // Never stop trying to reconnect
                reconnectInterval: 500, // Reconnect every 500ms
                poolSize: 10, // Maintain up to 10 socket connections
                // If not connected, return errors immediately rather than waiting for reconnect
                bufferMaxEntries: 0,
                promiseLibrary: Promise, // Use native promises in the underlying MongoDB Driver
                useNewUrlParser: true //New url parser
            }
        },
        session: {
            options: {
                secret: "537b8537c9292f085a233789f6411f92",
                resave: false,
                saveUninitialized: false,
                // store: new mongoStore({
                //     mongooseConnection: mongoose.connection,
                //     db: 'monitor_karewa_web_dev',
                //     touchAfter: 24 * 3600 // time period in seconds
                // }),
                cookie: {
                    path: '/',
                    httpOnly: false,
                    secure: false,
                    maxAge: null
                }
            }
        },
        behavior: {
            logLevel: 'info',
            i18nAutoReload: true,
            skipJobManager: process.env.SKIP_JOB_MANAGER || false
        },
        email: {
            stmpUser: process.env.SMTP_USER || 'monitorkarewa@gmail.com',
            stmpPass: process.env.SMTP_PASS || '',
            stmpHost: process.env.SMTP_HOST || 'smtp.gmail.com',
            stmpAccount: process.env.SMTP_ACCOUNT || 'Monitor Karewa <monitorkarewa@gmail.com>'
        }
    }
};


exports.get = function get() {
    return nodeEnv && nodeEnv === 'production' ? config[nodeEnv] : config.dev;
};

exports.isProd = function () {
    return !!nodeEnv && nodeEnv === 'production';
};
