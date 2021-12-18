//ajouter un like au post
exports.likePost = (req, res) => {
    //creation de l'id avec le numéro de idUser et le numéro de idPost
    let code= `${req.body.idUser}${req.params.id}`;
    let data = [[req.body.idUser, req.params.id, code]];
    // enregistrement du like sur la table like_post
    con.query("INSERT INTO like_post  (user_like, id_post, id) VALUES ?;",[data], function(err, _result){
        if (err) {
            res.json({
                message: "Vous avez déjà liké"
            });
        } else {
            data = [req.params.id]
            // increment  de 1  la colonne number_like du post dans la table posts
            con.query("UPDATE posts SET number_like = number_like + 1 WHERE id=?",data, function (err,result){
                if (err) {
                    throw err
                } else {
                    res.status(201).json({
                        message: result.affectedRows
                    });
                }
            })
        }
    })
}