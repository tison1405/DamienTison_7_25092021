const express = require ('express');
const router = express.Router();
const controUsers = require ('../controllers/users');
const auth = require('../middleware/Auth');
const multer = require('../middleware/multer-config');

router.post('/signup', controUsers.signup);
router.post('/login', controUsers.login);
router.get('/:id', auth,controUsers.userInfo);
router.put('/userPicture/:id', auth, multer,controUsers.userPicture);
router.delete('/deleteUser/:id', auth, controUsers.deleteUser);

  module.exports = router;