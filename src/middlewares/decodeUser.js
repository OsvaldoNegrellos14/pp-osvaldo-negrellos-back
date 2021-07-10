import jwt from 'jsonwebtoken';

module.exports = (req, res, next) => {
  const authorization = req.get('authorization');
  let token = '';
  if (authorization && authorization.toLowerCase().startsWith('bearer')) {
    token = authorization.substring(7);
  }

  const decodeToken = jwt.verify(token, process.env.SECRET);
  if (!token || !decodeToken.id) {
    return res.status(401).json({ success: false, info: 'token missing or invalid' });
  }
  next();
};