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

router.get('/name', async (req, res) => {
  try {
    const { firstName, lastName } = req.body;
    const leader = await leaderDB.get({ firstName, lastName });
    if (leader) {
      res.status(200).json(leader);
    } else {
      res
        .status(404)
        .json({ message: 'No player with that firstName  and lastName' });
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const leader = await leaderDB.get({ id });
    if (leader[0]) {
      res.status(200).json(leader[0]);
    } else {
      res.status(404).json({ message: 'No player with that id' });
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post('/', async (req, res) => {
  try {
    const player = await leaderDB.create(req.body);
    res.status(201).json(player[0]);
  } catch (error) {
    res.status(500).json(error);
  }
});
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const celeb = await leaderDB.update(id, req.body);
    res.status(200).json(celeb[0]);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const celeb = await leaderDB.remove(id);
    if (celeb) {
      res.status(200).json(celeb[0]);
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
