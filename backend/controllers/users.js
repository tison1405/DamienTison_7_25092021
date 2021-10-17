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
        const user = [[req.body.nom, req.body.prenom,ciphertext ,hash ,null ,0]];
        console.log(user);
        var sql ="INSERT INTO users ( nom, prenom, mail, password, photo, modérateur) VALUES ?";
        con.query(sql,[user], function (err, result) {
          console.log(err)
          if (err) {res.json({ message: "l'utilisateur existe déjà"})}
          else {res.json({ message:  result.affectedRows })};
          
        })});
}
else{
  res.json({message: "votre mot de passe doit contenir: MAJ+MIN+CHIFFRE+CARACT SPECIAL+ =>10 CARACT"})
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
                res.status(200).json({userId: result[0].id, nom: result[0].nom, prenom: result[0].prenom,
                  token: jwt.sign(//creation du token avec l'user._id//
                    { userId: result[0].id },
                    mytokenKey,
                    { expiresIn: '24h' } )
                  
                });
                console.log(result)
              })
            });
    

};

exports.nomModify = (req,res,next) =>{
  let sql = "UPDATE users SET nom =? WHERE id = ?";
  let data = [req.body.nom, req.params.id];
  con.query(sql,data,function(err, result){
    if (err) throw err;
    res.status(200).json({message:"user modifier!"})
  })
};

exports.prenomModify = (req, res, next) =>{
  let sql = "UPDATE users SET prenom =? WHERE id = ?";
  let data = [req.body.prenom, req.params.id];
  con.query(sql,data,function(err, result){
    if (err) throw err;
    res.status(200).json({message:"user modifier!"})
  })
};

exports.mailModify = (req, res, next) =>{
  const mycryptoKey = process.env.cryptoKey;//variable d'env//
    const mycryptoIv = process.env.cryptoIv;//variable d'env//
    var key = cryptoJs.enc.Hex.parse(mycryptoKey);
    var iv = cryptoJs.enc.Hex.parse(mycryptoIv);
    const ciphertext = cryptoJs.AES.encrypt(JSON.stringify(req.body.email), key, {iv: iv}).toString();
    let sql = "UPDATE users SET mail =? WHERE id = ?";
  let data = [ciphertext, req.params.id];
  con.query(sql,data,function(err, result){
    if (err) throw err;
    res.status(200).json({message:"user modifier!"})
  })
};

exports.passwordModify = (req, res, next) =>{
  if (req.body.password.match( /[0-9]/g) && //password doit contenir un chiffre//
  req.body.password.match( /[A-Z]/g) && //password doit contenir une majuscule//
  req.body.password.match(/[a-z]/g) && //password doit contenir une minuscule//
  req.body.password.match( /[^a-zA-Z\d]/g) &&//password doit contenir un caractère special//
  req.body.password.length >= 10){
  bcrypt.hash(req.body.password, 10)//hashage du mot de passe//
  .then(hash => {
    let data = [ hash ,req.params.id];
    let sql = "UPDATE users SET password =? WHERE id = ?";
    con.query(sql,data, function (err, result) {
      if (err) throw err;
      res.json({ message: "user modifier!" });
})})}
else{
  res.json({message: "votre mot de passe doit contenir: MAJ+MIN+CHIFFRE+CARACT SPECIAL+ =>10 CARACT"})
}};

exports.photoModify = (req, res, next) =>{

};

exports.departementModify = (req, res, next) =>{
  let sql = "UPDATE users SET departement =? WHERE id = ?";
  let data = [req.body.departement, req.params.id];
  con.query(sql,data,function(err, result){
    if (err) throw err;
    res.status(200).json({message:"user modifier!"})
  })
};

exports.userDelete = (req, res, next) =>{
con.query( "DELETE FROM users WHERE id = ?", req.params.id, function (err, result){
  if (err) throw err;
  res.status(200).json({message:"compte supprimer!!!!"})
})
};

exports.userPicture = (req, res, next) => {
  console.log(req.file);
  const imageUrl= `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;
  let sql = "UPDATE users SET photo =? WHERE id = ?";
  let data = [imageUrl, req.body.id];
  con.query(sql,data,function(err, result){
    if (err) throw err;
    res.status(200).json({message:"photo inserée!"})
  })
}
exports.userInfo = (req, res, next) =>{
  console.log(req.body);
  let sql="SELECT * FROM users WHERE id = ? ";
  let data =req.body;
  con.query(sql,data, function(err,result){
    if (err) throw err;})
  
}
