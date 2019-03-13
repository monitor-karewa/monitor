import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'

window.$ = window.jQuery = require('jquery');

Vue.config.productionTip = false;


//-------------------------------
//i18n config
//-------------------------------
import VueI18n from 'vue-i18n';
import es from './i18n/es.js';
import en from './i18n/en.js';
import jp from './i18n/jp.js';
Vue.use(VueI18n);
const i18n = new VueI18n({
    locale: 'es', //i18n inicial
    fallbackLocale: 'es',
    messages: {
        es: es,
        en: en,
        jp: jp
    }
});
//Para cambiar de i18n
//i18n.locale = 'en';


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




new Vue({
    router,
    store,
    i18n,
    render: h => h(App)
}).$mount('#app');
