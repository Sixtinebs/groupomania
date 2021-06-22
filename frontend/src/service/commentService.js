const axios = require('axios');

export default {
    createComment(token, comment) {
        return axios.post('http://localhost:3000/groupomania/comment', comment, { 'headers': { 'Authorization': 'Bearer ' + token } })
    },
    updateComment(token, id, comment) {
        return axios.put(`http://localhost:3000/groupomania/comment?id=${id}`, comment, { 'headers': { 'Authorization': 'Bearer ' + token } })
    }

}