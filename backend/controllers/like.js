
exports.likePost = (req, res, next) => {
    let val = req.body;
    let code= `${val.idUser}${val.idPost}`;
    let data = [[val.idUser, val.idPost, code]];
    con.query("INSERT INTO userlike  (user_like, id_post, codeIdUser) VALUES ?;",[data], function(err,result){
        if (err) {
            res.json({
                message: "Vous avez déjà liké"
            });
        } else {
            data = [val.likes, val.idPost]
            con.query("UPDATE forummulti SET postLike=? WHERE id=?",data, function (err,result){
                if (err) throw err;
                res.status(201).json({message: result.affectedRows});
            })}
            })
        }