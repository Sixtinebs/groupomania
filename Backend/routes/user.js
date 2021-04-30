const express =  require('express');
const router = express.Router();


const controller = require('../controllers/user');

router.get('/test', controller.test);
//router('/login', controller.login);
//router('register', controller.register);

module.exports = router;

