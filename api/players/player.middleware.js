require('dotenv').config();
const jwt = require('jsonwebtoken');

module.exports = {
  validateBody,
  validateLoginBody,
  validateBodyOR,
  authenticate
};

function validateBody(req, res, next) {
  const { name, email, password } = req.body;
  if (name && email && password) {
    next();
  } else {
    res
      .status(400)
      .json({ message: 'Please provide the name, email and password' });
  }
}
function validateLoginBody(req, res, next) {
  const { email, password } = req.body;
  if (email && password) {
    next();
  } else {
    res.status(400).json({ message: 'Please provide the email and password' });
  }
}

function validateBodyOR(req, res, next) {
  const { name, email, password } = req.body;
  if (name || email || password) {
    next();
  } else {
    res.status(400).json({
      message:
        'Please provide the field you want to update: name, email or password'
    });
  }
}

function authenticate(req, res, next) {
  const { token } = req.headers;
  if (token) {
    const isValid = jwt.verify(token, process.env.JWT_SECRET);
    if (isValid) {
      next();
    } else {
      res.status(401).json({ message: 'Invalid token, try login in again' });
    }
  } else {
    res.status(400).json({ message: 'Please provide token in the headers' });
  }
}
