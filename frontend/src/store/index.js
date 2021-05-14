import { createStore } from 'vuex';
const axios = require('axios');

const instance = axios.create({
    baseURL: 'http://localhost:3000/groupomania'
});

const store = createStore({
    state: {
    },
    actions: {
        addUser: ({ commit }, userInfo) => {
            return new Promise((resolve, reject) => {
                commit;
                instance.post('/auth/register', { userInfo })
                    .then(function (response) {
                        resolve(response)
                    })
                    .catch(function (error) {
                        reject(error)
                    });
            })
        },
        connectUser: ({ commit }, userInfo) => {
            commit;
            instance.post('/auth/login', { userInfo })
                .then(function (response) {
                    console.log(response)
                })
                .catch(function (error) {
                    console.log(error)
                });
        }
    }
});

export default store;