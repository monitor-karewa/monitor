import settingsApi from '@/api/settings.api';
import i18n from '@/plugins/i18n';

const state = {
    theme: ''
};

const getters = {
};

const actions = {
    CHANGE_THEME ({commit}, {theme, session}) {
        console.log('session', session);
        settingsApi.changeTheme({theme}, (result) => {
            console.log('result', result);
            if (result.data && !result.data.error && result.data.data) {
                console.log('inside if');
                tShow(i18n.t('settings.change-theme.update.success'), 'success');
                
                commit('THEME_CHANGED', {
                    theme: result.data.data.theme,
                    color: result.data.data.color,
                    session: session
                });
                commit('currentOrganizationColor', result.data.data.color);
                commit('currentOrganizationTheme', result.data.data.theme);
            } else {
                console.log('inside else');
                tShow(i18n.t('settings.change-theme.update.error'), 'danger');
            }
        }, (err) => {
            console.log('err', err);
            tShow(i18n.t('settings.change-theme.update.error'), 'danger');
        })
    }
};

const mutations = {
    THEME_CHANGED(state, {theme, color, session}) {
        state.theme = theme;

        session.set('currentOrganizationColor', color);
        session.set('currentOrganizationTheme', theme);

        let body = document.getElementById('body');
        body.className = `theme-body ${theme}`;
    }
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};
