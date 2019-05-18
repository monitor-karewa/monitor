import accountApi from "@/api/accounts.api";

import {bus} from "@/main";
import axios from "axios";
import Vue from "vue";

import i18n from "@/plugins/i18n";
import router from "@/router";
import session from "@/plugins/vueSession";

let state = {
    // permissions: []
};

let getters = {};
let actions = {
    LOGIN ({commit}, {credentials, _session}) {
        accountApi.login(credentials, (result) => {
            if (result.data.error || !result.data.data) {
                tShow(i18n.t('accounts.login.error'), 'danger');
            } else {

                let {token, permissions, user} = result.data.data;

                if (token) {

                    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                    
                    _session.set('jwt', token);
                    _session.set('permissions', permissions);
                    //Permissions are to be set in the session to persist on page reloads
                    // commit('SET_PERMISSIONS', {permissions});
                    
                    let redirectTo = router.currentRoute.query.redirectTo || '/admin';
                    router.push(redirectTo);
                }

                console.log('user.fullName', user.fullName);
                
                _session.set('userFullName', user.fullName);
                commit('CURRENT_USER', user, {root: true});
            }
        }, (err) => {
            tShow(i18n.t('accounts.login.error'), 'danger');
        });
    },
    LOGOUT ({commit}, {_session}) {
        
        tShow(i18n.t('accounts.logout.success'), 'success');

        _session.destroy();
        commit('SET_CURRENT_ORGANIZATION_DEFAULTS', {}, {root: true});
        
        router.push('/');
    }
};
let mutations = {
    // SET_PERMISSIONS (state, {permissions}) {
    //     state.permissions = permissions;
    // }
};

export default {
    namespaced: true,
    state: state,
    getters: getters,
    actions: actions,
    mutations: mutations,
}