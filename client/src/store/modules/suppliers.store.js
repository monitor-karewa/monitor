import suppliersApi from '@/api/suppliers.api';
import catalog from '@/store/modules/base/catalog.store';
import Vue from "vue";

const suppliersCatalog = catalog(suppliersApi, 'suppliers');

const state = {
    fieldErrors:{
        hasError:false,
        fields:{
            name:"",
            rfc:""
        }
    }
};

const getters = {
    fieldErrors: state => state.fieldErrors,
    hasErrors: state => state.fieldErrors.hasError
};

const actions = {
    validateForm({commit}, payload){
        let fieldErrors = {
            hasError:false,
            fields:{}
        };
        const rfcRegEx = /^([A-ZÑ\x26]{3,4}([0-9]{2})(0[1-9]|1[0-2])(0[1-9]|1[0-9]|2[0-9]|3[0-1]))([A-Z\d]{3})?$/;
        if(payload && !payload.name){
            fieldErrors.fields.name = "El nombre del proveedor es requerido";
            fieldErrors.hasError = true;
        }
        if(payload && !payload.rfc){
            fieldErrors.fields.rfc = "El RFC del proveedor es requerido";
            fieldErrors.hasError = true;
        }
        if(payload && payload.rfc && !rfcRegEx.test(payload.rfc)) {
            fieldErrors.fields.rfc = "El RFC tiene un formato no válido";
            fieldErrors.hasError = true;
        }

        commit('UPDATE_FIELD_ERRORS', fieldErrors);
    }
};

const mutations = {
    UPDATE_FIELD_ERRORS(state,payload){
        state.fieldErrors = payload
    }
};



export default {
    namespaced: true,
    state: {
        ...suppliersCatalog.state,
        ...state
    },
    getters: {
        ...suppliersCatalog.getters,
        ...getters
    },
    actions: {
        ...suppliersCatalog.actions,
        ...actions

    },
    mutations: {
        ...suppliersCatalog.mutations,
        ...mutations
    }
};