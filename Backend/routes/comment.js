const express = require('express');
const router = express.Router();

const commentControlleur = require('../controllers/comment');

router.get('/', commentControlleur.getAllComments);
// router.get();
// router.post();
// router.put();
// router.delete();

module.exports = router;