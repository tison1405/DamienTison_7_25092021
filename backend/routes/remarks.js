const express = require('express');
const router = express.Router();

const remarkCtrl = require('../controllers/remarks');
const auth = require('../middleware/Auth');


router.post('/commentaires', auth, remarkCtrl.createdRemark, remarkCtrl.putLastRemark);
router.get('/commentaires/:id', auth, remarkCtrl.getAllRemarks)

module.exports = router;