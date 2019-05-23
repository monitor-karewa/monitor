import api from '@/api/contact.api';

import i18n from '@/plugins/i18n';



const state = {
    messageSent : false

};

const getters = {

};

const actions = {

    postContact({commit}, contactInfo){
        api.contact(contactInfo, function (result) {
            tShow(result.data.message,  'info');
            if(!result.data.error) {commit('SET_SENT_STATUS', true);}
        })
    }

};

const mutations = {
    SET_SENT_STATUS(state, sent){
        state.messageSent = sent;
    }
};


export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};