const express = require('express');
const router = express.Router();

const commentCtrl = require('../controllers/commentaire');
const auth = require('../middleware/Auth');


router.post('/commentaires',auth, commentCtrl.createdCommentaire);



module.exports = router;