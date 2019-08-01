const router = require('express').Router();
const leaderDB = require('./leader.model');
require('dotenv').config();
const {
  validatePBody,
  validatePBodyOR,
  validateScore
} = require('./leader.middleware');
const { authenticate } = require('../players/player.middleware');

router.get('/', async (req, res) => {
  const { page, limit } = req.query;
  try {
    const leader = await leaderDB.paginate(limit, (page - 1) * limit);
    res.status(200).json(leader);
  } catch (error) {
    res.status(500).json({ message: "Couldn't retrieve the leaderboard list" });
  }
});

router.get('/players/:id', authenticate, async (req, res) => {
  try {
    const { id } = req.params;
    const leader = await leaderDB.get(id);
    if (leader[0]) {
      res.status(200).json(leader);
    } else {
      res.status(404).json({
        message: 'No player with that id or no record for the player yet'
      });
    }
  } catch (error) {
    res.status(500).json({ message: "Couldn't retrieve the player(s)" });
  }
});

router.post('/', validatePBody, async (req, res) => {
  try {
    const score = await leaderDB.create(req.body);
    res.status(201).json(score);
  } catch (error) {
    res.status(500).json({ message: "Couldn't add the score", error });
  }
});

router.put('/:id', validatePBodyOR, authenticate, async (req, res) => {
  try {
    const { id } = req.params;
    const score = await leaderDB.update(id, req.body);
    if (score) {
      res.status(200).json(score);
    } else {
      res.status(404).json({
        message: 'No score with that id or no record for the score yet'
      });
    }
  } catch (error) {
    res.status(500).json({ message: "Couldn't update the score" });
  }
});

router.delete('/:id', validateScore, authenticate, async (req, res) => {
  try {
    const { id } = req.params;
    const score = await leaderDB.remove(id);
    if (score) {
      res.status(200).json(score);
    } else {
      res.status(404).json({
        message: 'No score with that id'
      });
    }
  } catch (error) {
    res.status(500).json({ message: "Couldn't delete the score record" });
  }
});

module.exports = router;
