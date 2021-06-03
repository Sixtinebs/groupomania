const axios = require("axios");

// const BASE_URL = axios.create({
//     baseURL: 'http://localhost:3000/groupomania/auth'
// });
export default {
    getUser(id) {
        return axios.post('http://localhost:3000/groupomania/auth/user', id);
    },
    createUser(data) {
        return axios.post('http://localhost:3000/groupomania/auth/register', data);
    },
    postOneUser(data) {
        return axios.post('http://localhost:3000/groupomania/auth/login', data)
    }
}