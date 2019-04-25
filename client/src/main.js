import Vue from 'vue';
import App from '@/App.vue';
import moment from 'moment';

//Logger is used in most places, so it should go before any other plugins/options
import /*logger from */'@/plugins/logger';

import router from '@/router';
import store from '@/store';
import '@/registerServiceWorker';
import i18n from '@/plugins/i18n';
import vuelidate from '@/plugins/vuelidate';
import VueCurrencyFilter from '@/plugins/currencyFilter';


window.$ = window.jQuery = require('jquery');

Vue.config.productionTip = false;

export const bus = new Vue();

new Vue({
    router,
    store,
    i18n,
    moment,
    vuelidate,
    render: h => h(App)
}).$mount('#app');
