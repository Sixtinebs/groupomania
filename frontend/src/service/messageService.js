const axios = require("axios");

//const BASE_URL = 'http://localhost:3000/groupomania/message';
// const BASE_URL = axios.create({
//     baseURL: 'http://localhost:3000/groupomania/message'
// });
export default {
    getAll() {
        return axios.get('http://localhost:3000/groupomania/message');
    },
    createMessage(data) {
        return axios.post('http://localhost:3000/groupomania/message', data);
    },
}