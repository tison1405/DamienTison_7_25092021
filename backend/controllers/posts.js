const moderatorId = process.env.moderatorId;
//inserer dans la BDD un post//
exports.createPost = (req, res, next) => {
    const post = [[req.body.users_id, req.body.post,0 ,0 ]];
        //envoye du post à la table post//
    con.query("INSERT INTO posts ( users_id, post, report, number_like) VALUES ?",[post], function (err, result) {
        //si erreur message//
        if (err) {
            throw err;
            //si envoyer message nombre de lignes affectées = 1//
        } else {
            res.json({
                    message:  result.affectedRows,
                    id: result.insertId
            })
        }
    })
}
exports.createPostFile = (req, res, next) => {
    const fileUrl= `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;
    const post = [[req.body.userId, req.body.post, req.body.fileName, fileUrl,0 ,0 ]];
        //envoye du post à la table post//
    con.query("INSERT INTO posts ( users_id, post, post_filename, post_file, report, number_like) VALUES ?",[post], function (err, result) {
        //si erreur message//
        if (err) {
            throw err;
            //si envoyer message nombre de lignes affectées = 1//
        } else {
            res.json({
                message:  result.affectedRows,
                id: result.insertId
            })
        }
    })      
}
//recuper tout les posts//
exports.getAllPost = (req, res, next) => {
    con.query("SELECT users.name AS name, users.firstname AS firstname, users.picture AS picture, users.moderator AS userDeleted, posts.post AS message, posts.post_filename AS filename, posts.post_file AS file, posts.report AS report, posts.number_like AS likePost, posts.id AS idPost, posts.last_remark AS lastRemark, posts.last_remark_name AS lastRemarkName, posts.last_remark_firstname AS lastRemarkFirstname, posts.last_remark_picture AS lastRemarkPicture FROM users INNER JOIN posts ON users.id = posts.users_id ORDER BY posts.Date DESC;", function(err,result){
        if (err) {
            throw err;
        } else {
            res.json({
                  result 
                });
        };
    })
}
// recuper un post de la table posts//
exports.getOnePost = (req, res, next) =>{
    con.query("SELECT users.name AS name, users.firstname AS firstname, users.picture AS picture, users.moderator AS userDeleted, posts.post AS message, posts.post_filename AS filename, posts.post_file AS file, posts.number_like AS likePost, posts.id AS idPost FROM users INNER JOIN posts ON users.id = posts.users_id WHERE posts.id = ?", req.params.id, function (err, result){
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
    // validation du poste par le  moderateur //
    if (req.body.userId == moderatorId && req.body.reportNumber == 1){
        con.query("UPDATE posts SET report = 0 WHERE id=?;",req.params.id ,function(err, result){
            if (err){
                throw err;
            } else {
                res.json({ 
                    message : result.affectedRows
                })
            }
        })
    // signalement du post au moderateur //    
    } else {
        con.query("UPDATE posts SET report = 1 WHERE id=?;",req.params.id ,function(err, result){
            if (err){
                throw err;
            } else {
                res.json({ 
                    message: "Le post a été signalé au modérateur !" 
                })
            }
        })
    }
}

// recuperer les postes signalés//
exports.getPostModerator = (req, res, next) => {
    if (moderatorId === req.params.id){
        con.query("SELECT users.name AS name, users.firstname AS firstname, users.picture AS picture, users.moderator AS userDeleted, posts.post AS message, posts.post_filename AS filename, posts.post_file AS file, posts.report AS report, posts.number_like AS likePost, posts.id AS idPost, posts.last_remark AS lastRemark, posts.last_remark_name AS lastRemarkName, posts.last_remark_firstname AS lastRemarkFirstname, posts.last_remark_picture AS lastRemarkPicture FROM users INNER JOIN posts ON users.id = posts.users_id WHERE posts.report = 1 ORDER BY posts.Date DESC ;", function(err,result){
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
    con.query("UPDATE posts SET post = 'Votre post a été moderé' , report= 2 WHERE id = ?", req.params.id, function (err, result){
        if (err) {
            throw err;
        } else {
            res.json({
                message : result.affectedRows
            })
        }
    })
} 
