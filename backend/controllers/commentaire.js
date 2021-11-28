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
            next();
        }
    })
}
//ajouter à la table post le dernier commentaire//

exports.putLastComent = (req, res, next) => {
    const data = req.body.idPost;
    console.log(data);
    con.query("SELECT max(id) AS lastId from commentaire WHERE post_id = ?",data, function (err, result){
        if (err) {
            throw err;
        } else {
            console.log(result[0].lastId);
            const data = [result[0].lastId, req.body.idPost];
            con.query("UPDATE all_post SET last_commentaire =? WHERE id =?",data, function (err, result){
                if (err){
                    throw err;
                } else {
                    res.json({
                        message: result.affectedRows
                    })
                }
            })
        }
    })
}
