const express = require('express');
const router = express.Router();


const controller = require('../controllers/user');
const authentification = require('../middlewar/auth')

router.get('/users', controller.getAllUser);
router.get('/user', controller.getOneUser);
router.post('/login', controller.login);
router.post('/register', controller.register);
router.put('/user/:id?', authentification, controller.modify);
router.delete('/user/:id?', authentification, controller.delete);

module.exports = router;

