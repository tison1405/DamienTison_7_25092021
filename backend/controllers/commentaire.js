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
