//inserer dans la BD un post//
exports.createPost = (req, res, next) => {
    const post = [[req.body.users_id, req.body.commentaire,0 ,0]];
    var sql = "INSERT INTO all_post ( users_id, post, report, number_like) VALUES ?";
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
//recuper tout les posts//
exports.getAllPost = (req, res, next) => {
    con.query("SELECT users.nom AS nom, users.prenom AS prenom, users.photo AS photo, all_post.post AS message, all_post.number_like AS likePost, all_post.id AS idPost FROM users INNER JOIN all_post ON users.id = all_post.users_id ORDER BY all_post.Date DESC;", function(err,result){
        if (err) {
            res.json({ 
                message: "aucun post trouver"
            })
        } else {
            res.json({
                  result 
                });
        };
    })
}
// signaler au moderateur un post//
exports.modifyPost = (req, res, next) =>{
    con.query("UPDATE all_post SET report = 1 WHERE id=?;",req.body.idPost ,function(err, result){
        if (err){
            res.json({ 
                err: "probleme avec la base de donnée"
            });
        } else {
            res.json({ 
                message: "le post a été signalé au modérateur" 
            })
        }
    })
}