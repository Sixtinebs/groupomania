const express = require('express');
const router = express.Router();

const messageControlleur = require('../controllers/message');
const authentification = require('../middlewar/auth');

router.get('/', messageControlleur.getAllMessages);
//router.get('/:id?', messageControlleur.getOneMessage)
router.post('/', messageControlleur.createMessage);
//router.put('/', messageControlleur.modifyMessage);
router.delete('/:id?', messageControlleur.deleteMessage);

module.exports = router;