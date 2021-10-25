const jwt = require('jsonwebtoken');

exports.like = (req, res, next) => {
    con.query("SELECT user_like AS users likes FROM userlike WHERE post_id =?;",body.user.postId, function(err,result){
        if (err) throw err;
        const users = result.user_like
        for(let user in users){
            if (user === body.user.userId ){
                return res.status(401).json({ alert: 'vous ne pouvez pas liker plusieur foix le même poste!' });  
            }else{
                con.query("INSERT INTO forummulti (like) VALUES ? WHERE id=?"
            }
        }
})}