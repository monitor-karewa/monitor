import resourcesApi from '@/api/resources.api';
import catalog from '@/store/modules/base/catalog.store';

const resourcesCatalog = catalog(resourcesApi, 'resources');

const state = {
    classificationTypes:['LEGAL_FRAMEWORK', 'ARTICLE', 'NOTES', 'WEBSITE']
};

const getters = {
    classificationTypes: (state) => state.classificationTypes
};

const actions = {
};

const mutations = {
};



export default {
    namespaced: true,
    state: {
        ...resourcesCatalog.state,
        ...state
    },
    getters: {
        ...resourcesCatalog.getters,
        ...getters
    },
    actions: {
        ...resourcesCatalog.actions,
        ...actions

    },
    mutations: {
        ...resourcesCatalog.mutations,
        ...mutations
    }
};