exports.createPost = (req, res, next) => {
    const post = [[req.body.users_id, req.body.fichier, req.body.commentaire,0 ,0]];
    var sql = "INSERT INTO forummulti ( users_id, fichier, commentaire, publication, like) VALUES ?";
    con.query(sql,[post], function (err, result) {
        console.log(err);
        if (err) {res.json({ message: "le post n'a pas été enregistré"})}
        else {res.json({ message:  result.affectedRows })}
    })}

exports.getAllPost = (req, res, next) => {
    con.query("SELECT users.nom AS nom, users.prenom AS prenom, users.photo AS photo, forummulti.fichier AS fichier, forummulti.commentaire AS message FROM users INNER JOIN forummulti ON users.id = forummulti.users_id ORDER BY forummulti.Date;", function(err,result){
        if (err) {res.json({ message: "aucun post trouver"})}
          else {res.json({  result })};})
}