import Vue from 'vue';
import App from '@/App.vue';
import moment from 'moment';
import orderby from 'lodash/orderBy';
import BaseApi from '@/api/base.api'

//Logger is used in most places, so it should go before any other plugins/options
import /*logger from */'@/plugins/logger';

import router from '@/router';
import store from '@/store';
import '@/registerServiceWorker';
import * as io from 'socket.io-client'
import VueSocketIO from 'vue-socket.io'
const socket = io(BaseApi.baseUrl);

import i18n from '@/plugins/i18n';
import vuelidate from '@/plugins/vuelidate';
import '@/plugins/vueApexChart';
import VueCurrencyFilter from '@/plugins/currencyFilter';
import VueSession from '@/plugins/vueSession';
import { ftruncate } from 'fs';

let vue;
window.$ = window.jQuery = require('jquery');

Vue.config.productionTip = false;

Vue.filter('roundCurrency', (value) => {
    const toRound = !vue ? true : vue.$session.get('currentOrganizationRound');
    let decimals;
    if (toRound === false || toRound === "false") {
        decimals = 2;
    } else {
        decimals = 0;
    }
    const rounded = Number(Math.round(`${value}e${decimals}`)+`e-${decimals}`);
    return `$ ${rounded.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
});

Vue.filter('round', (value) => {
    const toRound = !vue ? true : vue.$session.get('currentOrganizationRound');
    let decimals;
    if (toRound === false || toRound === "false") {
        decimals = 2;
    } else {
        decimals = 0;
    }
    const rounded = Number(Math.round(`${value}e${decimals}`)+`e-${decimals}`);
    return rounded;
});

Vue.filter('date', (val) => {
    if (val) {
        return formatDate(val);
    } else {
        return val;
    }
});
  
  // super simple pt-BR date format
function formatDate(dt) {
    if(!dt) {
        return '';
    } else {
        if (typeof dt != 'string') {
            if (dt.toISOString) {
                dt = dt.toISOString();
            } else {
                dt = dt.toString();
            }
        }
        let date = dt.substring(0,10).split('-')
        date = date[2] + '/' + date[1] + '/' + date[0]
        return date;
    }
}

export const bus = new Vue();

Vue.use(new VueSocketIO({
        debug: true,
        connection: socket, //options object is Optional
        vuex: {
            store,
            actionPrefix: "SOCKET_",
            mutationPrefix: "SOCKET_"
        }
    })
);


vue = new Vue({
    router,
    store,
    i18n,
    moment,
    vuelidate,
    orderby,
    render: h => h(App)
}).$mount('#app');
    
router.beforeEach((to, from, next) => {
    //Hacky way to access the vue instance from the router guard
    //Also, admin/Index.vue has a copy of this logic because:
    //On app start, this router guard is not called, but the beforeMount hook of the Index.vue is called
    //On route change, this router guard is called, but the beforeMount hook of the Index.vue is not called
    let isLoggedIn = vue.$session.has('jwt');
    let hasOrganizationSelected = vue.$session.has('currentOrganizationId');

    if (!to.path.match(new RegExp('^/admin'))) {
        return next();
    }

    if (!isLoggedIn) {
        return next(`/login?redirectTo=${to.path}`);
    } else {
        let headingToSelectOrganization = to.path.match(new RegExp('^/admin/select-organization'));
        
        // if (headingToSelectOrganization) {
        //     return next();
        // }
        //
        // if (!hasOrganizationSelected) {
        //     tShow(i18n.t('accounts.organization.info.redirecting'), 'info');
        //     return next(`/admin/select-organization?redirectTo=${to.path}`);
        // }

        if (headingToSelectOrganization) {
            return next();
        }
        
        if (!headingToSelectOrganization && !hasOrganizationSelected) {
            tShow(i18n.t('accounts.organization.info.redirecting'), 'info');
            
            let redirectToParam = '';
            if (to.path !== '/admin/select-organization') {
                redirectToParam = `?redirectTo=${to.path}`;
            }

            return next(`/admin/select-organization${redirectToParam}`);
        } else {
            return next();
        }
    }

});