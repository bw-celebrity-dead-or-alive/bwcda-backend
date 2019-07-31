const router = require('express').Router();
const playeDB = require('./player.model');
const { validateBodyOR, authenticate } = require('./player.middleware');

router.get('/', async (req, res) => {
  const { page, limit } = req.query;
  try {
    const players = await playeDB.get(undefined, limit, (page - 1) * limit);
    res.status(200).json(players);
  } catch (error) {
    res.status(500).json({ message: "Couldn't retrieve the players list" });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const player = await playeDB.get(id);
    if (player) {
      res.status(200).json(player);
    } else {
      res.status(404).json({
        message: 'No player with that id'
      });
    }
  } catch (error) {
    res.status(500).json({ message: "Couldn't retrieve the player" });
  }
});

// router.post('/', validatePBody, async (req, res) => {
//   try {
//     const score = await leaderDB.create(req.body);
//     res.status(201).json(score);
//   } catch (error) {
//     res.status(500).json({ message: "Couldn't add the score", error });
//   }
// });

router.put('/:id', validateBodyOR, authenticate, async (req, res) => {
  try {
    const { id } = req.params;
    const player = await playeDB.update(id, req.body);
    if (player) {
      res.status(200).json(player);
    } else {
      res.status(404).json({
        message: 'No player with that id'
      });
    }
  } catch (error) {
    res.status(500).json({ message: "Couldn't update the player" });
  }
});

router.delete('/:id', authenticate, async (req, res) => {
  try {
    const { id } = req.params;
    const player = await playeDB.remove(id);
    if (player) {
      res.status(200).json(player);
    } else {
      res.status(404).json({
        message: 'No player with that id'
      });
    }
  } catch (error) {
    res.status(500).json({ message: "Couldn't delete the player" });
  }
});

module.exports = router;
