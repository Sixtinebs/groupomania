import { createStore } from 'vuex';
const axios = require('axios');

const instance = axios.create({
    baseURL: 'http://localhost:3000/groupomania'
});

const store = createStore({
    //Current state
    state: {
        status: '',
        userInfo: {
            id: -1,
            token: ''
        }
    },
    // function => change the state
    mutations: {
        SET_STATUS: function (state, status) {
            state.status = status;
        },
        CONNECT_USER: function (state, userInfo) {
            state.userInfo = userInfo;
        }
    },
    //fonction => Trigger a mutations
    actions: {
        addUser: ({ commit }, userInfo) => {
            //Commit a mutation
            commit('SET_STATUS', 'loading')
            return new Promise((resolve, reject) => {
                //set user info 
                instance.post('/auth/register', { userInfo })
                    .then(function (response) {
                        resolve(response);
                        commit('SET_STATUS', 'created');
                        commit('CONNECT_USER', response.data);
                    })
                    .catch(function (error) {
                        reject(error);
                        commit('SET_STATUS', 'error_create');
                    });
            })
        },
        connectUser: ({ commit }, userInfo) => {
            commit('SET_STATUS', 'loading');
            return new Promise((resolve, reject) => {
                instance.post('/auth/login', { userInfo })
                    .then(function (response) {
                        resolve(response);
                        commit('SET_STATUS', '');
                    })
                    .catch(function (error) {
                        reject(error);
                        commit('SET_STATUS', 'error_connect');
                    });
            })

        }
    }
});

export default store;