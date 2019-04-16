import Vue from 'vue';
import Vuex from 'vuex';
import createLogger from 'vuex/dist/logger'

import sessionStore from '@/store/modules/session.store';
import suppliersStore from '@/store/modules/suppliers.store';
import administrativeUnits from '@/store/modules/administrativeUnits.store';
import contracts from '@/store/modules/contracts.store';
import resources from '@/store/modules/resources.store';
import users from '@/store/modules/users.store';
import calculations from '@/store/modules/calculations.store';
import organizations from '@/store/modules/organizations.store';


import actions from '@/store/actions';
import store from '@/store/store';
import mutations from '@/store/mutations';


Vue.use(Vuex);

//TODO: a better way to obtain current env
const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
    modules: {
        session: sessionStore,
        suppliers: suppliersStore,
        administrativeUnits : administrativeUnits,
        contracts : contracts,
        resources : resources,
        users : users,
        calculations : calculations,
        organizations : organizations
    },
    store: store,
    actions: actions,
    mutations: mutations,
    strict: debug,
    plugins: debug ? [createLogger()] : []
});