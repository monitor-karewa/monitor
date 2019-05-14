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
import '@/plugins/vueApexChart';
import VueCurrencyFilter from '@/plugins/currencyFilter';
import VueSession from '@/plugins/vueSession';


window.$ = window.jQuery = require('jquery');

Vue.config.productionTip = false;

export const bus = new Vue();

let vue = new Vue({
    router,
    store,
    i18n,
    moment,
    vuelidate,
    render: h => h(App)
}).$mount('#app');
    
router.beforeEach((to, from, next) => {
    //Hacky way to access the vue instance from the router guard
    //Also, admin/Index.vue has a copy of this logic because:
    //On app start, this router guard is not called, but the beforeMount hook of the Index.vue is called
    //On route change, this router guard is called, but the beforeMount hook of the Index.vue is not called
    let hasOrganizationSelected = vue.$session.has('currentOrganizationId');

    if (!to.path.match('^/admin')) {
        return next();
    }

    if (to.path !== '/admin/select-organization' && !hasOrganizationSelected) {
        return next(`/admin/select-organization?redirectTo=${to.path}`);
    } else {
        return next();
    }

});