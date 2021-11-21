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
            res.status(200).json({
                message: result.affectedRows
            })
        }

    })
}