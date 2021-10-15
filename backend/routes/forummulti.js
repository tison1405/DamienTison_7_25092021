const express = require('express');
const router = express.Router();

const postCtrl = require('../controllers/posts');
const auth = require('../middleware/Auth');

router.get('/',auth, postCtrl.getAllPost);
router.post('/',auth, postCtrl.createPost);


module.exports = router;
