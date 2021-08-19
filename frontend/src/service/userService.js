const axios = require("axios");

export default {
    getUser(userId) {
        return axios.get(`http://localhost:3000/groupomania/auth/user?id=${userId}`, { params: { userId } });
    },
    getAllUsers() {
        return axios.get('http://localhost:3000/groupomania/auth/users')
    },
    createUser(data) {
        return axios.post('http://localhost:3000/groupomania/auth/register', data);
    },
    postOneUser(data) {
        return axios.post('http://localhost:3000/groupomania/auth/login', data)
    },
    modifyUser(id, token, data) {
        return axios.put(`http://localhost:3000/groupomania/auth/user/${id}`, data, { 'headers': { 'Authorization': 'Bearer ' + token } })
    },
    deleteUser(id, token) {
        return axios.delete(`http://localhost:3000/groupomania/auth/user/${id}`, { 'headers': { 'Authorization': 'Bearer ' + token } })
    }
}