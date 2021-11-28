const bcrypt = require('bcrypt');
var CryptoJs = require('crypto-js');
const jwt = require('jsonwebtoken');

const mycryptoKey = process.env.cryptoKey;//variable d'env//
const mycryptoIv = process.env.cryptoIv;//variable d'env//
var key = CryptoJs.enc.Hex.parse(mycryptoKey);//clé de cryptage de l'adresse mail//
var iv = CryptoJs.enc.Hex.parse(mycryptoIv);

 //controllers pour créer un utilisateur//
exports.signup = (req, res, next) => {
  //control du mot de passe//
  if (req.body.password.match( /[0-9]/g) && //password doit contenir un chiffre//
      req.body.password.match( /[A-Z]/g) && //password doit contenir une majuscule//
      req.body.password.match(/[a-z]/g) && //password doit contenir une minuscule//
      req.body.password.match( /[^a-zA-Z\d]/g) &&//password doit contenir un caractère special//
      req.body.password.length >= 10) {//password doit contenir 10 ou plus caractères//
        //encodage Email//
    const ciphertext = CryptoJs.AES.encrypt(req.body.email, key, {iv: iv});
    const ciphertextString = ciphertext.toString();
        //encodage Password//
    bcrypt.hash(req.body.password, 10)//hashage du mot de passe//
        //envoi de l'objet user à la BD//
    .then(hash => {
      const user = [[req.body.nom, req.body.prenom,ciphertextString ,hash ,"http://localhost:8080/img/inconnu.e88a85b6.png" ,0]];
      var sql ="INSERT INTO users ( nom, prenom, mail, password, photo, modérateur) VALUES ?";
      con.query(sql,[user], function (err, result) {
            //Utilisateut existe déjà//
        if (err) {
          res.json({ 
            message: "l'utilisateur existe déjà"
          })
            //Utlisateur créé avec réponse = 1//
        } else {
          res.json({ 
            message:  result.affectedRows 
          })
        };
      })
    });
    //probleme de saisi du mot de passe//
  } else {
    res.json({
      message: "otre mot de passe doit contenir: MAJ+MIN+CHIFFRE+CARACT SPECIAL+ =>10 CARACT"
    })
  }
};

//controllers pour se loguer et recuperer les données utilisateur//
exports.login = (req, res, next) => {
    //encodage de l'adresse Email//
  const ciphertext = CryptoJs.AES.encrypt(req.body.email, key, {iv: iv});
  const ciphertextString = ciphertext.toString();

    //recuperation des données utilisateur//
  con.query("SELECT * FROM users WHERE mail = ?",ciphertextString, function(err,result){
    if (result[0]){
      bcrypt.compare(req.body.password, result[0].password)//adresse mail identique comparaison du MP/
      .then(valid => {
        // mot de passe invalide//
        if (!valid) {
            res.json({ 
              message: 'Mot de passe incorrect !',
              errMotdepasse: true
            });
        //mot de passe valide//
        } else {
          const mytokenKey = process.env.tokenKey;//variable env//
          res.status(200).json({
            userId: result[0].id, 
            nom: result[0].nom, 
            prenom: result[0].prenom, 
            photo: result[0].photo,
                //creation du token avec l'userId//
            token: jwt.sign( 
              {userId: result[0].id },
              mytokenKey,
              {expiresIn: '24h' } 
            ) 
          });
        }
      })
    } else {
      res.json({
        message: "Vous n'est pas inscrit ! Inscrivez vous !",
        errMail: true
      });
    }
  });
};

exports.userPicture = (req, res, next) => {
  const imageUrl= `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;
  let sql = "UPDATE users SET photo =? WHERE id = ?";
  let data = [imageUrl, req.params.id];
  con.query(sql,data,function(err, result){
    if (err){
      res.status(401).json({
        err: "probleme"
      })
    } else {
      res.status(200).json({
        message: result.affectedRows
      })
    }
  })
}
exports.userInfo = (req, res, next) =>{
  let sql="SELECT * FROM users WHERE id = ? ";
  let data =req.params.id;
  con.query(sql,data, function(err,result){
    var mail = result[0].mail;
    var cipherParams = CryptoJs.lib.CipherParams.create({
        ciphertext: CryptoJs.enc.Base64.parse(mail)
    });
    const bytes = CryptoJs.AES.decrypt(cipherParams, key, {iv: iv});
    const bytesString = bytes.toString(CryptoJs.enc.Utf8);
    if (err) {
      throw err
    } else { 
      res.status(200).json({
        userId: result[0].id, nom: result[0].nom, prenom: result[0].prenom, photo: result[0].photo, email: bytesString
      })
    }
  })
}
  
