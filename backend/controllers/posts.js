const moderatorId = process.env.moderatorId;
//inserer dans la BD un post//
exports.createPost = (req, res, next) => {
    const post = [[req.body.users_id, req.body.post,0 ,0 ]];
    var sql = "INSERT INTO posts ( users_id, post, report, number_like) VALUES ?";
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
    con.query("SELECT users.name AS name, users.firstname AS firstname, users.picture AS picture, posts.post AS message, posts.number_like AS likePost, posts.id AS idPost, posts.last_remark AS lastRemark, posts.last_remark_name AS lastRemarkName, posts.last_remark_firstname AS lastRemarkFirstname, posts.last_remark_picture AS lastRemarkPicture FROM users INNER JOIN posts ON users.id = posts.users_id ORDER BY posts.Date DESC;", function(err,result){
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
// recuper un post de la table posts//
exports.getOnePost = (req, res, next) =>{
    con.query("SELECT users.name AS name, users.firstname AS firstname, users.picture AS picture, posts.post AS message, posts.number_like AS likePost, posts.id AS idPost FROM users INNER JOIN posts ON users.id = posts.users_id WHERE posts.id = ?", req.params.id, function (err, result){
        if (err){
            throw err;
        } else {
            res.json({
                result
            })
        }
    })
}
// signaler au moderateur un post//
exports.modifyPost = (req, res, next) =>{
    con.query("UPDATE posts SET report = 1 WHERE id=?;",req.params.id ,function(err, result){
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
// recuperer les postes signalés//
exports.getPostModerator = (req, res, next) => {
    if (moderatorId === req.params.id){
        con.query("SELECT users.name AS name, users.firstname AS firstname, users.picture AS picture, posts.post AS message, posts.number_like AS likePost, posts.id AS idPost, posts.last_remark AS lastRemark, posts.last_remark_name AS lastRemarkName, posts.last_remark_firstname AS lastRemarkFirstname, posts.last_remark_picture AS lastRemarkPicture FROM users INNER JOIN posts ON users.id = posts.users_id WHERE posts.report = 1 ORDER BY posts.Date DESC ;", function(err,result){
            if (err){
                throw err;
            } else {
                res.json({
                    result
                })
            }
        })
    } else {
        res.json({
            message: "Vous n'avez pas les droits pour acceder à cette page"
        })
    }
}
 // modère un post//
exports.modaratePost = (req, res, next) => {
    con.query("UPDATE posts SET post = Votre post a été moderé , report= 2 WHERE id = ?", req.params.id, function (err, result){
        if (err) {
            throw err;
        } else {
            res.json({
                message : result.affectedRows
            })
        }
    })
} 
