import usersApi from '@/api/users.api.js';
import { bus } from '@/main';

const state = {
    user : {
        profilePictureId : "",
        name : "",
        lastName : "",
    }
};

const getters = {

};

const actions = {
    CHANGE_PICTURE ({commit}, {session, formData}) {
        usersApi.uploadProfilePicture(formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }, (result) => {
            if (result.data && !result.data.error && result.data.data) {
                tShow('Imagen de perfil actualizada', 'info');
                session.set('currentProfilePicture', result.data.data.profilePicture);
                commit('SET_PROFILE_PICTURE', result.data.data.profilePicture);
            } else {
                tShow('Ocurrió un error cargando la imagen', 'danger');
            }
        }, (error) => {
            console.log('error', error);
            tShow('Ocurrió un error cargando la imagen', 'danger');
        });
    },

    LOAD_PROFILE_INFO ({commit}, {session,id}) {
        let query = "?id="+id;
        
        usersApi.getProfileInfo({query}, {
        }, (result) => {
            if (result.data && !result.data.error && result.data.data) {
                session.set('currentProfilePicture', result.data.data.profilePicture);
                commit('SET_PROFILE_INFO', result.data.data);
            } else {
                tShow('Ocurrió un error cargando la imagen', 'danger');
            }
        }, (error) => {
            console.log('error', error);
            tShow('Ocurrió un error cargando la imagen', 'danger');
        });
    },

    UPDATE_PROFILE_INFO({commit},params) {
        usersApi.updateProfileInfo(params.user, {
        }, (result) => {
            tShow(result.data.message, 'info');
        }, (error) => {
            console.log('error', error);
            tShow('Ocurrió un error salvando la información', 'danger');
        });
    },
};

const mutations = {

    SET_PROFILE_PICTURE(state, profilePictureId){
        console.log("profilePictureId", profilePictureId);
        state.user.profilePicture = profilePictureId;
    },

    SET_PROFILE_INFO(state, user){
        state.user = user;
        // state.user.name = name;
        // state.user.lastName = lastName;
        // state.user.profilePictureId = profilePicture;
    }

};


export default {
    namespaced: true,
    state: state,
    getters: getters,
    actions: actions,
    mutations: mutations
};