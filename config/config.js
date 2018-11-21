/**
 * Created by taco on 11/21/18.
 */

const nodeEnv = process.env.NODE_ENV;

const config = {
    production: {
        mongo: {
            url: process.env.MONGODB_URL,
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
        }
    },
    dev: {
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
        }
    }
};


exports.get = function get() {
    return nodeEnv && nodeEnv === 'production' ? config[nodeEnv] : config.dev;
};