const express = require('express');
const router = express.Router();

const messageControlleur = require('../controllers/message');
const auth = require('../middlewar/auth');
const authentification = require('../middlewar/auth');

router.get('/', messageControlleur.getAllMessages);
router.get('/post/:id?', messageControlleur.getOneMessage)
router.post('/', authentification, messageControlleur.createMessage);
router.put('/:id?', authentification, messageControlleur.modifyMessage);
router.delete('/:id?', authentification, messageControlleur.deleteMessage);

module.exports = router;