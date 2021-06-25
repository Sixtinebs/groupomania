const axios = require("axios");


export default {
    getUser(userId) {
        console.log('id service ', userId)
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
        console.log('hey')
        return axios.put(`http://localhost:3000/groupomania/auth/user/${id}`, data, { 'headers': { 'Authorization': 'Bearer ' + token } })
    }
}