import { createStore } from 'vuex';
const axios = require('axios');

const instance = axios.create({
    baseURL: 'http://localhost:3000/groupomania'
});

const store = createStore({
    state: {
        status: '',
        userId: {
            id: -1,
            token: ''
        }
    },
    mutations: {
        setStatus: function (state, status) {
            state.status = status;
        },
        connectUser: function (state, user) {
            state.user = user;
        }
    },
    actions: {
        addUser: ({ commit }, userInfo) => {
            commit('setStatus', 'loading')
            return new Promise((resolve, reject) => {
                instance.post('/auth/register', { userInfo })
                    .then(function (response) {
                        resolve(response);
                        commit('setStatus', 'created');
                        commit('connectUser', response.data);
                    })
                    .catch(function (error) {
                        reject(error);
                        commit('setStatus', 'error_create');
                    });
            })
        },
        connectUser: ({ commit }, userInfo) => {
            commit('setStatus', 'loading');
            return new Promise((resolve, reject) => {
                instance.post('/auth/login', { userInfo })
                    .then(function (response) {
                        resolve(response);
                        commit('setStatus', '');
                    })
                    .catch(function (error) {
                        reject(error);
                        commit('setStatus', 'error_connect');
                    });
            })

        }
    }
});

export default store;