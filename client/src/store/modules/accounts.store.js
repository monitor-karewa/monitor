import accountApi from "@/api/accounts.api";

import {bus} from "@/main";
import axios from "axios";
import Vue from "vue";

import i18n from "@/plugins/i18n";
import router from "@/router";
import session from "@/plugins/vueSession";

let state = {
    
};

let getters = {};
let actions = {
    LOGIN ({commit}, {credentials, _session}) {
        accountApi.login(credentials, (result) => {
            if (result.data.error || !result.data.data) {
                tShow(i18n.t('accounts.login.error'), 'danger');
            } else {

                let token = result.data.data;

                if (token) {

                    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                    
                    _session.set('jwt', token);
                    let redirectTo = router.currentRoute.query.redirectTo || '/admin';
                    router.push(redirectTo);
                }
            }
        }, (err) => {
            console.log('err', err);
            tShow(i18n.t('accounts.login.error'), 'danger');
        });
    },
    LOGOUT ({}, {_session}) {
        
        tShow(i18n.t('accounts.logout.success'), 'success');

        _session.destroy();
        router.push('/');
    }
};
let mutations = {};

export default {
    namespaced: true,
    state: state,
    getters: getters,
    actions: actions,
    mutations: mutations,
}