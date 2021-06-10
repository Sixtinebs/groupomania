const express = require('express');
const router = express.Router();


const controller = require('../controllers/user');

router.get('/users', controller.getAllUser);
router.get('/user', controller.getOneUser);
router.post('/login', controller.login);
router.post('/register', controller.register);

module.exports = router;

