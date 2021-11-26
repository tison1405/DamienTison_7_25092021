// ajouter un commentaire à la table commentaire//
exports.createdCommentaire = (req, res, next) => {
    const commentaire = [[req.body.idPost, req.body.commentaire, req.body.idUser]];
    var sql = "INSERT INTO commentaire ( post_id, post_commentaire, user_id) VALUES ?";
    con.query(sql,[commentaire], function (err, result) {
        if (err) {
            res.status(402).json({ 
                message: "Commentaire non ajouté "
            })
        } else {
            var message = result.affectedRows;
            res.json({
                message,   
            })
        }
    })
}
//ajouter à la table post le dernier commentaire//
exports.putLastCommentaire = (req, res, next) => {
    const data = [req.body.commentaire, req.body.nom, req.body.prenom, req.body.photo, req.body.idPost];
    var sql = "UPDATE all_post SET last_commentaire = ?, last_commentaire_nom = ?, last_commentaire_prenom = ?, last_commentaire_photo = ? WHERE id =?";
    con.query(sql,data, function (err, result){
        if (err) {
            throw err;
        } else {
            res.json({
                message: result.affectedRows
            })
        }
    })
}
exports.getPostAllComent = (req, res, next) => {
    const data = [req.body.idPost];
    console.log(data);
    var sql = ("SELECT users.nom AS commentaire_nom, users.prenom AS commentaire_prenom, users.photo AS commentaire_photo, commentaire.post_commentaire AS commentaire, all_post.number_like AS likes FROM commentaire INNER JOIN users ON commentaire.user_id = users.id INNER JOIN all_post ON commentaire.post_id = all_post.id WHERE commentaire.post_id = ?");
    con.query(sql,[data], function (err, result){
        if (err) {
            throw err;
        } else {
            res.json({
                result 
            });
            console.log(result);
        }
    })
}
