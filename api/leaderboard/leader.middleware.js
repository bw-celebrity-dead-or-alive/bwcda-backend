const db = require('./leader.model');

module.exports = {
  validatePBody,
  validateRBody,
  validatePBodyOR,
  validatePlayer
};

async function validatePlayer(req, res, next) {
  const { id } = req.params;
  try {
    const player = await db.get({ id });
    if (player[0]) {
      next();
    } else {
      res.status(400).json({ message: "The user with that id doesn't exist" });
    }
  } catch (error) {
    res.status(500).json({ message: "Couldn't validate the player" });
  }
}
function validatePBody(req, res, next) {
  const { firstName, lastName, score } = req.body;
  if (firstName && lastName && score) {
    next();
  } else {
    res
      .status(400)
      .json({ message: 'Please provide the firstName, lastName and score' });
  }
}
function validatePBodyOR(req, res, next) {
  const { firstName, lastName, score } = req.body;
  if (firstName || lastName || score) {
    next();
  } else {
    res.status(400).json({
      message:
        'Please provide the field you want to update: firstName, lastName or score'
    });
  }
}
function validateRBody(req, res, next) {
  const { firstName, lastName } = req.body;
  if (firstName && lastName) {
    next();
  } else {
    res
      .status(400)
      .json({ message: 'Please provide the firstName and lastName' });
  }
}
