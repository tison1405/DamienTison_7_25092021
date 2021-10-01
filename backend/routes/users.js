const express = require ('express');
const router = express.Router();
const controUsers = require ('../controllers/users');

router.post('/signup', controUsers.signup);
router.post('/login', controUsers.login);

  module.exports = router;