const express = require('express');
const router = express.Router();

const messageControlleur = require('../controllers/message');
const authentification = require('../middleware/auth');
const multer = require('../middleware/multer')

router.get('/', authentification, messageControlleur.getAllMessages);
router.get('/post/:id?', authentification, messageControlleur.getOneMessage)
router.post('/', authentification, multer, messageControlleur.createMessage);
router.put('/:id?', authentification, multer, messageControlleur.modifyMessage);
router.delete('/:id?', authentification, messageControlleur.deleteMessage);

module.exports = router;