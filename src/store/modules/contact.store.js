import api from '@/api/contact.api';

import i18n from '@/plugins/i18n';



const state = {
    messageSent : false,
    organization : {
        schedule : "",
        address : "",
        additionalInformation : ""
    }

};

const getters = {

};

const actions = {

    postContact({commit}, contactInfo){
        api.contact(contactInfo, function (result) {
            tShow(result.data.message,  'info');
            if(!result.data.error) {commit('SET_SENT_STATUS', true);}
        })
    },
    loadOrganization({commit}, contactInfo){
        api.loadOrganization(contactInfo, function (result) {
            commit('SET_ORGANIZATION', result.data.data)
        })
    },

};

const mutations = {
    SET_SENT_STATUS(state, sent){
        state.messageSent = sent;
    },
    SET_ORGANIZATION(state, {schedule, address, additionalInformation}){
        state.organization.schedule = schedule;
        state.organization.address = address;
        state.organization.additionalInformation = additionalInformation;
    }
};


export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};