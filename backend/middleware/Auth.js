const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    console.log("oui oui");
    const token = req.headers.authorization.split(' ')[1];
    const mytokenKey = process.env.tokenKey;
    const decodedToken = jwt.verify(token, mytokenKey);
    const userId = decodedToken.userId;
    if (req.body.userId && req.body.userId !== userId) {
      throw 'Invalid user ID';
    } else {
      next();
    }
  } catch {
    res.status(401).json({
      error: 'Invalid request!'
    });
  }
};