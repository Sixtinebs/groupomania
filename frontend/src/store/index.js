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
            userId: -1,
            token: ''
        },
        user: {
            id: '',
            name: '',
            email: '',
            isAdmin: ''

        }
    },
    // function => change the state
    mutations: {
        SET_STATUS: function (state, status) {
            state.status = status;
        },
        CONNECT_USER: function (state, userInfo) {
            state.userInfo = userInfo;
        },
        GET_USER: function (state, user) {
            state.user.id = user.id;
            state.user.name = user.name;
            state.user.email = user.email;
            state.user.isAdmin = user.isAdmin;
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
                        console.log(response.data)
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
                        commit('SET_STATUS', 'connected')
                        commit('CONNECT_USER', response.data);
                    })
                    .catch(function (error) {
                        reject(error);
                        commit('SET_STATUS', 'error_connect');
                    });
            })

        },
        getUser: ({ commit }, id) => {
            return new Promise((resolve, reject) => {
                instance.post('/auth/user', { userId: id })
                    .then(function (response) {
                        resolve(response);
                        commit('SET_STATUS', 'connected');

                        commit('GET_USER', response.data.user);
                    })
                    .catch(function (error) {
                        console.log(error)
                        reject(error);
                        commit('SET_STATUS', 'error_user');
                    })
            })
        }
    }
});

export default store;