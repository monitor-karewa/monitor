import contractsApi from '@/api/publicContracts.api';
import Vue from "vue";


const storeName = "publicContracts";

const state = {
    docName: "",
    adminstrativeUnitsForFilter : [],
    fiscalYears : [],
    trimonths : [],
    administrationPeriods : [],
    procedureTypes : [],
    lastQuery : {}
};

const getters = {

};

const actions = {
    getAdministrativeUnitsForFilter({commit}) {
        contractsApi.retrieveAdministrativeUnitsForFilter({},
            (result) => {
                commit('SET_ADMINISTRATIVE_UNITS_FILTER', result.data);
            })
    },
    getFiscalYears({commit}) {
        contractsApi.retrieveFiscalYears({},
            (result) => {
                commit('SET_FISCAL_YEARS', result.data);
            })
    },
    getTrimonths({commit}) {
        contractsApi.retrieveTrimonths({},
            (result) => {
                commit('SET_TRIMONTHS', result.data);
            })
    },
    getAdministrationPeriods({commit}) {
        contractsApi.retrieveAdministrationPeriods({},
            (result) => {
                commit('SET_ADMINISTRATION_PERIODS', result.data);
            })
    },
    getProcedureTypes({commit}) {
        contractsApi.retrieveProceudureTypes({},
            (result) => {
                if (result && result.data && result.data.length) {
                    let procedureTypes = result.data.map(function (item) {
                        return item._id;
                    });
                    commit('SET_PROCEDURE_TYPES', procedureTypes);
                }
            })
    }
}

const mutations = {
    SET_ADMINISTRATIVE_UNITS_FILTER (state, administrativeUnits) {
        state.adminstrativeUnitsForFilter = administrativeUnits;
    },
    SET_FISCAL_YEARS (state, fiscalYears) {
        state.fiscalYears = fiscalYears;
    },
    SET_TRIMONTHS (state, trimonths) {
        state.trimonths = trimonths;
    },
    SET_ADMINISTRATION_PERIODS (state, administrationPeriods) {
        state.administrationPeriods = administrationPeriods;
    },
    SET_PROCEDURE_TYPES(state, procedureTypes) {
        state.procedureTypes = procedureTypes;
    }
};



export default {
    namespaced: true,
    state: {
        ...state
    },
    getters: {
        ...getters
    },
    actions: {
        ...actions

    },
    mutations: {
        ...mutations
    }
};