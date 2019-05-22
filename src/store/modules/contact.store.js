import api from '@/api/contact.api';

import i18n from '@/plugins/i18n';



const state = {

};

const getters = {

};

const actions = {

    postContact({commit}, contactInfo){
        api.contact(contactInfo, function (result) {
            console.log("result", result);
            //Say something friendly :D
        })
    }

};

const mutations = {

};


export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};