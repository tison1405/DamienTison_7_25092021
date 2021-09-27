const express = require ('express');
const router = express.Router();

router.get('/users/signIn',(req, res, next) =>{
    con.query("SELECT * FROM espece", function (err, result) {
      if (err) throw err;
      res.json({ message: result });
    })
  });

  module.exports = router;