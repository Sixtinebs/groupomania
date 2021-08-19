import { createStore } from 'vuex';
const axios = require('axios');
import userServices from '../service/userService';

const instance = axios.create({
    baseURL: 'http://localhost:3000/groupomania'
});
// if user is connect
let userInfo = localStorage.getItem('user');
if (!userInfo) {
    userInfo = {
        userId: -1,
        token: ''
    }
} else {
    try {
        userInfo = JSON.parse(userInfo);
        instance.defaults.headers.common['Authorization'] = userInfo.token;
    } catch {
        userInfo = {
            userId: -1,
            token: ''
        }
    }
}
let userProfil = localStorage.getItem('userProfil');
userProfil = JSON.parse(userProfil)
const store = createStore({
    //Current state
    state: {
        status: '',
        userInfo: userInfo,
        user: { userProfil },
    },
    // function => change the state
    mutations: {
        SET_STATUS: function (state, status) {
            state.status = status;
        },
        CONNECT_USER: function (state, userInfo) {
            state.userInfo = userInfo;
            localStorage.setItem('user', JSON.stringify(userInfo));
        },
        GET_USER: function (state, user) {
            let userProfil = {
                id: user.id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin
            };
            state.user.userProfil = userProfil;
            localStorage.setItem('userProfil', JSON.stringify(userProfil));
        },
        DISCONNECT_USER: function (state, userInfo) {
            state.userInfo = userInfo;
            localStorage.removeItem('user', JSON.stringify(userInfo));
        }
    },
    //fonction => Trigger a mutations
    actions: {
        addUser: ({ commit }, userInfo) => {
            //Commit a mutation
            commit('SET_STATUS', 'loading')
            return new Promise((resolve, reject) => {
                //set user info 
                userServices.createUser({ userInfo })
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
                userServices.postOneUser({ userInfo })
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
        getUser: ({ commit }, userId) => {
            return new Promise((resolve, reject) => {
                userServices.getUser(userId)
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
        },
        disconnectUser: ({ commit }, userInfo) => {
            commit('DISCONNECT_USER', userInfo);
        }
    }
});

export default store;