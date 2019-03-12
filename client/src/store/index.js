import Vue from 'vue';
import Vuex from 'vuex';
import createLogger from 'vuex/dist/logger'


import proveedores from '@/store/modules/proveedores';
import session from '@/store/modules/session';


Vue.use(Vuex);

//TODO: a better way to obtain current env
const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
    modules: {
        session: session,
        proveedores: proveedores
    },
    strict: debug,
    plugins: debug ? [createLogger()] : []
});