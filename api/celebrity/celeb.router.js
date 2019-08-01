const router = require('express').Router();
const CelebDB = require('./celeb.model');
const {
  validateCelebrity,
  validatePBody,
  validatePBodyOR
} = require('./celeb.middleware');
const { authenticate } = require('../players/player.middleware');

router.get('/', async (req, res) => {
  const { page, limit } = req.query;
  try {
    const celebs = await CelebDB.paginate(limit, (page - 1) * limit);
    res.status(200).json(celebs);
  } catch (error) {
    res.status(500).json({ message: "Couldn't retrieve the celebrities list" });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const celeb = await CelebDB.get({ id });
    if (celeb) {
      res.status(200).json(celeb);
    } else {
      res.status(404).json({ message: 'No celebrity with that id' });
    }
  } catch (error) {
    res.status(500).json({ message: "Couldn't retrieve the celebrity" });
  }
});

router.get('/picture/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const celeb = await CelebDB.get({ id });
    res.status(200).json(celeb.image_url);
  } catch (error) {
    res.status(500).json({ message: "Couldn't retrieve the picture" });
  }
});

router.post('/', validatePBody, async (req, res) => {
  try {
    const celeb = await CelebDB.create(req.body);
    res.status(201).json(celeb);
  } catch (error) {
    res.status(500).json({ message: "Couldn't create the celebrity" });
  }
});

router.put('/:id', validatePBodyOR, async (req, res) => {
  try {
    const { id } = req.params;
    const celeb = await CelebDB.update(id, req.body);
    res.status(200).json(celeb);
  } catch (error) {
    res.status(500).json({ message: "Couldn't update the celebrity" });
  }
});

router.delete('/:id', validateCelebrity, authenticate, async (req, res) => {
  try {
    const { id } = req.params;
    const celeb = await CelebDB.remove(id);
    if (celeb) {
      res.status(200).json(celeb);
    } else {
      res.status(404).json({
        message: 'No celebrity with that id'
      });
    }
  } catch (error) {
    res.status(500).json({ message: "Couldn't delete the celebrity" });
  }
});

module.exports = router;
