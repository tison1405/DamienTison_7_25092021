const express = require ('express');
const router = express.Router();
const controUsers = require ('../controllers/users');
const auth = require('../middleware/Auth');
const multer = require('../middleware/multer-config');

router.post('/signup', controUsers.signup);
router.post('/login', controUsers.login);

router.get('/user',auth ,controUsers.userInfo);

router.put('/modifyNom',controUsers.nomModify);
router.put('/modifyPrenom',controUsers.prenomModify);
router.put('/modifyMail',controUsers.mailModify);
router.put('/modifyPassword',controUsers.passwordModify);
router.put('/userPicture',auth ,multer ,controUsers.userPicture);
router.put('/modifyDepartement',controUsers.departementModify);

router.delete('/:id/delete',controUsers.userDelete)
  module.exports = router;