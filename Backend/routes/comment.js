const express = require('express');
const router = express.Router();

const commentControlleur = require('../controllers/comment');
const authentification = require('../middlewar/auth');

router.get('/', authentification, commentControlleur.getAllComments);
// router.get();
router.post('/', authentification, commentControlleur.createComments);
router.put('/:id?', authentification, commentControlleur.modifyComments);
router.delete('/:id?', authentification, commentControlleur.deleteComments);

module.exports = router;