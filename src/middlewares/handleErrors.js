/* eslint-disable no-unused-vars */
const ERROR_HANDLERS = {
  CastError: (res) => {
    res.status(400).json({ success: false, info: 'id used is malformed' });
  },
  ValidationError: (res, { message }) => {
    res.tatus(409).json({ succes: false, info: message });
  },
  JsonWebTokenError: (res) => {
    res.status(401).json({ success: false, info: 'Token missing or invalid' });
  },
  false: (res) => {
    res.status(401).json({ success: false, info: 'Invalid email or password' });
  },
  SyntaxError: (res) => {
    res.status(400).json({ success: false, info: 'Syntax error check your petition' });
  },
  MissingData: (res) => {
    res.status(400).json({ succes: false, info: 'Email and password are required' });
  },
  defaultError: (res) => res.status(500).end()
};


module.exports = (error, req, res, next) => {
  console.log(error.name);
  const handler = ERROR_HANDLERS[error.name] || ERROR_HANDLERS.defaultError;
  handler(res, error);
};