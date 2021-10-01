const express = require ('express');
const router = express.Router();
const controUsers = require ('../controllers/users');

router.post('/signup', controUsers.signup);
router.post('/login', controUsers.login);

router.put('/:id/modifyNom',controUsers.nomModify);
router.put('/:id/modifyPrenom',controUsers.prenomModify);
router.put('/:id/modifyMail',controUsers.mailModify);
router.put('/:id/modifyPassword',controUsers.passwordModify);
router.put('/:id/modifyPhoto',controUsers.photoModify);
router.put('/:id/modifyDepartement',controUsers.departementModify);

router.delete('/:id/delete',controUsers.userDelete)
  module.exports = router;