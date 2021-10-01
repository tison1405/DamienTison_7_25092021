const bcrypt = require('bcrypt');
var cryptoJs = require('crypto-js');
const jwt = require('jsonwebtoken');



exports.signup = (req, res, next) => {
        if (req.body.password.match( /[0-9]/g) && //password doit contenir un chiffre//
  req.body.password.match( /[A-Z]/g) && //password doit contenir une majuscule//
  req.body.password.match(/[a-z]/g) && //password doit contenir une minuscule//
  req.body.password.match( /[^a-zA-Z\d]/g) &&//password doit contenir un caractère special//
  req.body.password.length >= 10) {//password doit contenir 10 ou plus caractères//
  const mycryptoKey = process.env.cryptoKey;//variable d'env//
  const mycryptoIv = process.env.cryptoIv;//variable d'env//
  var key = cryptoJs.enc.Hex.parse(mycryptoKey);//clé de cryptage de l'adresse mail//
  var iv = cryptoJs.enc.Hex.parse(mycryptoIv);
  const ciphertext = cryptoJs.AES.encrypt(JSON.stringify(req.body.email), key, {iv: iv}).toString();//cryptage de l'adresse mail//
  bcrypt.hash(req.body.password, 10)//hashage du mot de passe//
  .then(hash => {
        const user = [[null, req.body.nom, req.body.prenom,ciphertext, hash ,req.body.departement, null]];
        console.log(user);
        var sql ="INSERT INTO users (id, nom, prenom, mail, password, departement, photo) VALUES ?";
        con.query(sql,[user], function (err, result) {
          if (err) throw err;
          res.json({ message: "Number of records inserted: " + result.affectedRows });
          
        })});
}};

        


    


exports.login = (req, res, next) => {
    const mycryptoKey = process.env.cryptoKey;//variable d'env//
    const mycryptoIv = process.env.cryptoIv;//variable d'env//
    var key = cryptoJs.enc.Hex.parse(mycryptoKey);
    var iv = cryptoJs.enc.Hex.parse(mycryptoIv);
    const ciphertext = cryptoJs.AES.encrypt(JSON.stringify(req.body.email), key, {iv: iv}).toString();
    con.query("SELECT * FROM users WHERE mail = ?",ciphertext, function(err,result){
        if (err) throw err;
        if (result == 0){
                return res.status(401).json({error:"Utilisateur non trouvé !"});
              }
              bcrypt.compare(req.body.password, result[0].password)//adresse mail identique comparaison du MP/
              .then(valid => {
                if (!valid) {// mot de passe invalide//
                  return res.status(401).json({ error: 'Mot de passe incorrect !' });
                }
                const mytokenKey = process.env.tokenKey;//variable env//
                res.status(200).json({userId: result[0].id,
                  token: jwt.sign(//creation du token avec l'user._id//
                    { userId: result[0].id },
                    mytokenKey,
                    { expiresIn: '24h' }
                  )
                });
              })
            });
    

};