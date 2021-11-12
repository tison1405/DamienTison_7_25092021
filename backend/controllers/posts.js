exports.createPost = (req, res, next) => {
    const post = [[req.body.users_id, req.body.commentaire,0 ,0]];
    var sql = "INSERT INTO forummulti ( users_id, commentaire, publication, postLike) VALUES ?";
    //envoye du post à la table post//
    con.query(sql,[post], function (err, result) {
        //si erreur message//
        if (err) {
            res.json({ 
                message: "le post n'a pas été enregistré"})
            //si envoyer message nombre de lignes affectées = 1//
        } else {res.json({
                 message:  result.affectedRows 
                })
        }
    })       
}

exports.getAllPost = (req, res, next) => {
    con.query("SELECT users.nom AS nom, users.prenom AS prenom, users.photo AS photo, forummulti.commentaire AS message, forummulti.postLike AS likePost, forummulti.id AS idPost FROM users INNER JOIN forummulti ON users.id = forummulti.users_id ORDER BY forummulti.Date DESC;", function(err,result){
        if (err) {res.json({ message: "aucun post trouver"})}
          else {res.json({  result });
        console.log(result)};})
}

exports.modifyPost = (req, res, next) =>{
    con.query("UPDATE forummulti SET publication = 1 WHERE id=?;",req.body.idPost ,function(err, result){
        if (err) throw err;
        else {res.json({ message: "le post a été envoyé au modérateur" })}
    })
}