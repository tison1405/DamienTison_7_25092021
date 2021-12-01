const express = require('express');
const router = express.Router();

const remarkCtrl = require('../controllers/remarks');
const postCtrl = require('../controllers/posts');
const auth = require('../middleware/Auth');
const likeCtrl = require('../controllers/like');

router.get('/', auth, postCtrl.getAllPost);
router.get('/post/:id', auth, postCtrl.getOnePost);
router.get('/moderator/:id', auth, postCtrl.getPostModerator);
router.post('/', auth, postCtrl.createPost);
router.post('/likes/:id', auth, likeCtrl.likePost);
router.put('/moderator/:id', auth, postCtrl.modifyPost);
router.delete('/moderator/:id', auth, remarkCtrl.deleteRemarks, postCtrl.modaratePost)


module.exports = router;
