const axios = require("axios");

export default {
    getAll() {
        return axios.get('http://localhost:3000/groupomania/message');
    },
    createMessage(data) {
        return axios.post('http://localhost:3000/groupomania/message', data);
    },
    updateMessage(id, message) {
        console.log('service', message)
        return axios.put(`http://localhost:3000/groupomania/message?id=${id}`, { message: message });
    },
    deleteMessage(id) {
        return axios.delete('http://localhost:3000/groupomania/message', { params: { id } })
    }
}