import Vue from 'vue';
import Vuex from 'vuex';
import createLogger from 'vuex/dist/logger'


import suppliersModule from '@/store/modules/suppliers.module';
import session from '@/store/modules/session';

import actions from '@/store/actions';
import store from '@/store/store';
import mutations from '@/store/mutations';


Vue.use(Vuex);

//TODO: a better way to obtain current env
const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
    modules: {
        session: session,
        suppliers: suppliersModule
    },
    store: store,
    actions: actions,
    mutations: mutations,
    strict: debug,
    plugins: debug ? [createLogger()] : []
});