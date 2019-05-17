import settingsApi from '@/api/settings.api';
import i18n from '@/plugins/i18n';

const state = {
};

const getters = {
};

const actions = {
    CHANGE_THEME ({commit}, {theme, session}) {
        settingsApi.changeTheme({theme}, (result) => {
            if (result.data && !result.data.error && result.data.data) {
                tShow(i18n.t('settings.change-theme.update.success'), 'success');

                session.set('currentOrganizationColor', result.data.data.color);
                session.set('currentOrganizationTheme', result.data.data.theme);
                
                commit('CURRENT_ORGANIZATION', result.data.data, {root: true});


                let body = document.getElementById('body');
                body.className = `theme-body ${theme}`;
                
            } else {
                tShow(i18n.t('settings.change-theme.update.error'), 'danger');
            }
        }, (err) => {
            tShow(i18n.t('settings.change-theme.update.error'), 'danger');
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
