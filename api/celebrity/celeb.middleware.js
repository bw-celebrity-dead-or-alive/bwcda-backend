const db = require('./celeb.model');

module.exports = {
  validatePBody,
  validatePBodyOR,
  validateCelebrity
};

async function validateCelebrity(req, res, next) {
  const { id } = req.params;
  try {
    const player = await db.get({ id });
    if (player) {
      next();
    } else {
      res
        .status(404)
        .json({ message: "The celebrity with that id doesn't exist" });
    }
  } catch (error) {
    res.status(500).json({ message: "Couldn't validate the celebrity" });
  }
}
function validatePBody(req, res, next) {
  const { name, info, birth, death } = req.body;
  if (name && info && birth && death) {
    next();
  } else {
    res.status(400).json({
      message:
        'Please provide the name, info, birth, and death of the celebrity. image_url is optional '
    });
  }
}
function validatePBodyOR(req, res, next) {
  const { name, info, birth, death, image_url } = req.body;
  if (name || info || birth || death || image_url) {
    next();
  } else {
    res.status(400).json({
      message:
        'Please provide the field you want to update: name, info, birth, death or image_url'
    });
  }
}
