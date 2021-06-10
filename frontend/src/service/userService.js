const axios = require("axios");


export default {
    getUser(userId) {
        return axios.get('http://localhost:3000/groupomania/auth/user', { params: { userId } });
    },
    getAllUsers() {
        return axios.get('http://localhost:3000/groupomania/auth/users')
    },
    createUser(data) {
        return axios.post('http://localhost:3000/groupomania/auth/register', data);
    },
    postOneUser(data) {
        return axios.post('http://localhost:3000/groupomania/auth/login', data)
    }
}