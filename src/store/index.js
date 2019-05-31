import Vue from 'vue';
import Vuex from 'vuex';
import createLogger from 'vuex/dist/logger'

import sessionStore from '@/store/modules/session.store';
import suppliersStore from '@/store/modules/suppliers.store';
import administrativeUnits from '@/store/modules/administrativeUnits.store';
import contracts from '@/store/modules/contracts.store';
import resources from '@/store/modules/resources.store';
import users from '@/store/modules/users.store';
import profileUsers from '@/store/modules/profileUsers.store';
import calculations from '@/store/modules/calculations.store';
import organizations from '@/store/modules/organizations.store';
import dataLoad from '@/store/modules/dataLoad.store';
import adminHomeStore from '@/store/modules/adminHomeStore.store';
import accounts from '@/store/modules/accounts.store';
import settings from '@/store/modules/settings.store';


//user
import userHomeStore from '@/store/modules/userHomeStore.store';

import publicOrganizationsStore from '@/store/modules/publicOrganizations.store';
import publicContractsStore from '@/store/modules/publicContracts.store';
import publicSuppliersStore from '@/store/modules/publicSuppliers.store';
import millonesTrimestreChart from '@/store/modules/landingCharts/millonesTrimestreChart.store';
import ejercidoProcedimientoChart from '@/store/modules/landingCharts/ejercidoProcedimientoChart.store';
import visitasMonitorChart from '@/store/modules/adminCharts/monitorVisitasChart.store';
import visitasRutasChart from '@/store/modules/adminCharts/visitasRutasChart.store';
import publicComparationsStore from '@/store/modules/publicComparations.store';
import publicResourcesStore from '@/store/modules/publicResources.store';
import contactStore from '@/store/modules/contact.store';


import actions from '@/store/actions';
import state from '@/store/state';
import mutations from '@/store/mutations';


Vue.use(Vuex);

//TODO: a better way to obtain current env
const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
    modules: {
        userHome : userHomeStore,
        session: sessionStore,
        suppliers: suppliersStore,
        administrativeUnits : administrativeUnits,
        millonesTrimestreChart : millonesTrimestreChart,
        ejercidoProcedimientoChart : ejercidoProcedimientoChart,
        visitasMonitorChart : visitasMonitorChart,
        visitasRutasChart : visitasRutasChart,
        contracts : contracts,
        resources : resources,
        users : users,
        profileUsers : profileUsers,
        calculations : calculations,
        organizations : organizations,
        dataLoad: dataLoad,
        adminHomeStore: adminHomeStore,
        accounts: accounts,
        settings: settings,
        //public stores (for users)
        publicOrganizations: publicOrganizationsStore,
        publicSuppliers: publicSuppliersStore,
        publicContracts : publicContractsStore,
        publicComparations : publicComparationsStore,
        publicResources: publicResourcesStore,
        contact : contactStore
    },
    state: state,
    actions: actions,
    mutations: mutations,
    strict: debug,
    plugins: debug ? [createLogger()] : []
});