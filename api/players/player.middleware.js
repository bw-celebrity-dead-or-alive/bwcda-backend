module.exports = {
  validateBody,
  validateLoginBody,
  validateBodyOR
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
