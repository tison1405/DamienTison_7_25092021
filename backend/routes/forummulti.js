const express = require('express');
const router = express.Router();

const postCtrl = require('../controllers/posts');

router.get('/',  postCtrl.getAllPost);
router.post('/', postCtrl.createPost);


module.exports = router;
