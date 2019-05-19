import Vue from 'vue';

//-------------------------------
//Logger config
//-------------------------------
import VueLogger from 'vuejs-logger';
//TODO: A better way to check environment
const isProduction = process.env.NODE_ENV === 'production';

const loggerOptions = {
    isEnabled: true,
    logLevel : isProduction ? 'error' : 'debug',
    stringifyArguments : false,
    showLogLevel : true,
    showMethodName : true,
    separator: '|',
    showConsoleColors: true
};

Vue.use(VueLogger, loggerOptions);