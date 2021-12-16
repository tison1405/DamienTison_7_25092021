//ajoute un commentaire à la table remarks
exports.createdRemark = (req, res, next) => {
    const remark = [[req.body.idPost, req.body.remark, req.body.idUser]];
    var sql = "INSERT INTO remarks ( post_id, post_remark, user_id) VALUES ?";
    con.query(sql,[remark], function (err) {
        if (err) {
            res.status(402).json({ 
                message: "Commentaire non ajouté "
            })
        } else {
            //envoi vers la fonction putLastRemarks
            next();
        }
    })
}

//ajouter à la table posts le dernier commentaire
exports.putLastRemark = (req, res) => {
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
//recupère toutes les commentaires d'un post
exports.getAllRemarks = (req, res) => {
    con.query("SELECT remarks.id AS idRemark, remarks.post_remark AS remark, users.name AS name, users.firstname AS firstname, users.picture AS picture, users.moderator AS userDelete  FROM `remarks` INNER JOIN users ON remarks.user_id = users.id WHERE remarks.post_id = ?", req.params.id, function (err, result){
        if (err) {
            throw err
        } else {
            res.json({
                result
            })
        }
    })
}
//supprime les commentaires d'un post 
exports.deleteRemarks = (req, res, next) =>{
    con.query("DELETE FROM `remarks` WHERE post_id = ?", req.params.id, function(err, result){
        if (err) {
            throw err;
        } else {
            //envoi vers la fonction moderatePost de controllers/posts.js
            next();
        }
    })
}
