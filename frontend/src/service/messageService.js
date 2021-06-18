const axios = require("axios");

export default {
    getAll(token) {
        return axios.get('http://localhost:3000/groupomania/message', { 'headers': { 'Authorization': 'Bearer ' + token } });
    },
    getOneMessage(id, token) {
        return axios.get(`http://localhost:3000/groupomania/message/post/?id=${id}`, { 'headers': { 'Authorization': 'Bearer ' + token } })
    },
    createMessage(data, token) {
        return axios.post('http://localhost:3000/groupomania/message', data, { 'headers': { 'Authorization': 'Bearer ' + token } });
    },
    updateMessage(id, message, token) {
        return axios.put(`http://localhost:3000/groupomania/message?id=${id}`, message, { 'headers': { 'Authorization': 'Bearer ' + token } });
    },
    deleteMessage(id, token) {
        console.log(id, token)
        return axios.delete(`http://localhost:3000/groupomania/message?id=${id}`, { 'headers': { 'Authorization': 'Bearer ' + token } })
    }
}