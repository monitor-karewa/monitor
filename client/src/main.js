import Vue from 'vue';
import App from '@/App.vue';

//Logger is used in most places, so it should go before any other plugins/options
import /*logger from */'@/plugins/logger';

import router from '@/router';
import store from '@/store';
import '@/registerServiceWorker';
import i18n from '@/plugins/i18n';

window.$ = window.jQuery = require('jquery');

Vue.config.productionTip = false;

new Vue({
    router,
    store,
    i18n,
    render: h => h(App)
}).$mount('#app');
