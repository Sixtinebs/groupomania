const express = require('express');
const router = express.Router();

const commentControlleur = require('../controllers/comment');

router.get('/', commentControlleur.getAllComments);
// router.get();
router.post('/', commentControlleur.createComments);
router.put('/:id?', commentControlleur.modifyComments);
router.delete('/:id?', commentControlleur.deleteComments);

module.exports = router;