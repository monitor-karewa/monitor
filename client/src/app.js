import Vue from 'vue';
import App from './App.vue';
import router from './router';

const $ = require('jquery');
window.$ = $;

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


new Vue({
    el: '#app',
    router,
    i18n,
    components: { App },
    template: '<App/>'
});