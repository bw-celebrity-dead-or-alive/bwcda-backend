const router = require('express').Router();
const leaderDB = require('./leader.model');

router.get('/', async (req, res) => {
  const { page, limit } = req.query;
  try {
    const leader = await leaderDB.paginate(limit, (page - 1) * limit);
    res.status(200).json(leader);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const celeb = await leaderDB.get({ id });
    if (celeb) {
      res.status(200).json(celeb);
    } else {
      res.status(404).json({ message: 'No celebrity with that id' });
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get('/picture/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const celeb = await leaderDB.get({ id });
    res.status(200).json(celeb.image_url);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post('/', async (req, res) => {
  try {
    const celeb = await leaderDB.create(req.body);
    res.status(201).json(celeb);
  } catch (error) {
    res.status(500).json(error);
  }
});
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const celeb = await leaderDB.update(id, req.body);
    res.status(200).json(celeb);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const celeb = await leaderDB.remove(id);
    if (celeb) {
      res.status(200).json(celeb);
    } else {
      res.status(404).json({
        message: 'No celebrity with that id'
      });
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
