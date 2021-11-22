//ajouter un like au post//
exports.likePost = (req, res, next) => {
    let val = req.body;
    //creation de l'id avec le numéro de idUser et le numéro de idPost//
    let code= `${val.idUser}${val.idPost}`;
    let data = [[val.idUser, val.idPost, code]];
    con.query("INSERT INTO like_post  (user_like, id_post, id) VALUES ?;",[data], function(err,result){
        if (err) {
            res.json({
                message: "Vous avez déjà liké"
            });
        } else {
            data = [val.idPost]
            con.query("UPDATE all_post SET number_like = number_like + 1 WHERE id=?",data, function (err,result){
                if (err) {
                    res.json({ 
                        err: "probleme pour incrementer le number_like dans la table all_post "
                    });
                } else {
                    res.status(201).json({
                        message: result.affectedRows
                    });
                }
            })
        }
     })
}