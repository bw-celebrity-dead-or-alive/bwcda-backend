const router = require('express').Router();
const leaderDB = require('./leader.model');
require('dotenv').config();
const {
  validatePBody,
  validateRBody,
  validatePBodyOR,
  validatePlayer
} = require('./leader.middleware');

router.get('/', async (req, res) => {
  const { page, limit } = req.query;
  try {
    const leader = await leaderDB.paginate(limit, (page - 1) * limit);
    res.status(200).json(leader);
  } catch (error) {
    res.status(500).json({ message: "Couldn't retrieve the leaderboard list" });
  }
});

router.get('/name', validateRBody, async (req, res) => {
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
    res.status(500).json({ message: "Couldn't retrieve the player(s)" });
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
    res.status(500).json({ message: "Couldn't retrieve the player" });
  }
});

router.post('/', validatePBody, async (req, res) => {
  try {
    const player = await leaderDB.create(req.body);
    res.status(201).json(player[0]);
  } catch (error) {
    res.status(500).json({ message: "Couldn't add the player" });
  }
});

router.put('/:id', validatePBodyOR, async (req, res) => {
  try {
    const { id } = req.params;
    const celeb = await leaderDB.update(id, req.body);
    res.status(200).json(celeb[0]);
  } catch (error) {
    res.status(500).json({ message: "Couldn't update the player" });
  }
});

router.delete('/:id', validatePlayer, async (req, res) => {
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
    res.status(500).json({ message: "Couldn't delete the player record" });
  }
});

module.exports = router;
