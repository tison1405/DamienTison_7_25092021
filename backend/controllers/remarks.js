// ajouter un commentaire à la table commentaire//
exports.createdRemark = (req, res, next) => {
    const remark = [[req.body.idPost, req.body.remark, req.body.idUser]];
    var sql = "INSERT INTO remarks ( post_id, post_remark, user_id) VALUES ?";
    con.query(sql,[remark], function (err, result) {
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
exports.putLastRemark = (req, res, next) => {
    const data = [req.body.remark, req.body.userName, req.body.userFirstname, req.body.userPicture, req.body.idPost];
    con.query("UPDATE posts SET last_remark= ?,last_remark_name= ?,last_remark_firstname=?,last_remark_picture=? WHERE id = ?",data, function (err, result){
        if (err) {
            throw err;
        } else {
            res.json({
                message:result.affectedRows
            })
        }
    })
}
