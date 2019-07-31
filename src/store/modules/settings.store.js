import settingsApi from '@/api/settings.api';
import i18n from '@/plugins/i18n';

const state = {
    settings: {
        title: '',
        description: '',
        contactLocation: '',
        contactEmail: '',
        address: '',
        schedule: '',
        additionalInformation: '',
        welcomeTitle: ''
    },
    lastUpdate : undefined
};

const getters = {
};

const actions = {
    LOAD_SETTINGS ({commit}) {
        settingsApi.loadSettings({}, (result) => {
            if (result.data && !result.data.error && result.data.data) {
                console.log(result.data);
                commit('SETTINGS_UPDATED', result.data.data);
            } else {
                tShow(i18n.t('settings.load-settings.error'), 'danger');
            }
        }, (err) => {
            tShow(i18n.t('settings.load-settings.error'), 'danger');
        })
    },

    CHANGE_COVER ({commit}, {session, formData}) {
        settingsApi.changeCover(formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }, (result) => {
            if (result.data && !result.data.error && result.data.data) {
                tShow(i18n.t('settings.change-cover.update.success'), 'danger');
                session.set('currentOrganizationCover', result.data.data.cover);
                commit('CURRENT_ORGANIZATION', result.data.data, {root: true});
            } else {
                tShow(i18n.t('settings.change-cover.update.error'), 'danger');
            }
        }, (error) => {
            console.log('error', error);
            tShow(i18n.t('settings.change-cover.update.error'), 'danger');
        });
    },
    
    CHANGE_SETTINGS ({commit}, {session, title, description, contactLocation, contactEmail, address, schedule, additionalInformation, welcomeTitle}) {
        settingsApi.changeSettings({title, description, contactLocation, contactEmail, address, schedule, additionalInformation, welcomeTitle}, (result) => {
            if (result.data && !result.data.error && result.data.data) {
                tShow(i18n.t('settings.change-settings.update.success'), 'success');

                // session.set('currentOrganizationCover', );
                session.set('currentOrganizationTitle', result.data.data.title);
                session.set('currentOrganizationDescription', result.data.data.description);

                commit('SETTINGS_UPDATED', result.data.data);
            } else {
                tShow(i18n.t('settings.change-settings.update.error'), 'danger');
            }
        }, (err) => {
            tShow(i18n.t('settings.change-settings.update.error'), 'danger');
        })
    },
    
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
    SETTINGS_UPDATED (state, {title, description, contactLocation, contactEmail, address, schedule, additionalInformation, welcomeTitle, updatedAt}) {
        state.settings.title = title;
        state.settings.description = description;
        state.settings.contactLocation = contactLocation;
        state.settings.contactEmail = contactEmail;
        state.settings.address = address;
        state.settings.schedule= schedule;
        state.settings.additionalInformation = additionalInformation;
        state.settings.welcomeTitle = welcomeTitle;
        state.lastUpdate = updatedAt;
    }
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};
