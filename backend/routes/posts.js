const express = require('express');
const router = express.Router();

const postCtrl = require('../controllers/posts');
const auth = require('../middleware/Auth');
const likeCtrl = require('../controllers/like');

router.get('/',auth, postCtrl.getAllPost);
router.post('/',auth, postCtrl.createPost);
router.post('/likes/:id',auth,likeCtrl.likePost);
router.put('/moderator/:id',auth,postCtrl.modifyPost);


module.exports = router;
