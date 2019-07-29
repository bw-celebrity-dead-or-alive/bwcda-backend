const router = require('express').Router();
const Axios = require('axios');
const CelebDB = require('./celeb.model');

router.get('/', async (req, res) => {
  const { page, limit } = req.query;
  try {
    const celebs = await CelebDB.paginate(limit, (page - 1) * limit);
    res.status(200).json(celebs);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const celeb = await CelebDB.get({ id });
    if (celeb) {
      const search = await Axios.get(
        `https://api.tvmaze.com/search/people?q=${encodeURI(celeb.name)}`
      );
      const image = search.data.filter(
        pi => pi.score > 30 && pi.person && pi.person.image
      )[0].person.image.medium;

      celeb.image_url = image;

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
    const celeb = await CelebDB.get({ id });
    const search = await Axios.get(
      `https://api.tvmaze.com/search/people?q=${encodeURI(celeb.name)}`
    );
    const image = search.data.filter(
      pi => pi.score > 30 && pi.person && pi.person.image
    )[0].person.image.medium;
    res.status(200).json(image);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post('/', async (req, res) => {
  try {
    const celeb = await CelebDB.create(req.body);
    res.status(201).json(celeb);
  } catch (error) {
    res.status(500).json(error);
  }
});
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const celeb = await CelebDB.update(id, req.body);
    res.status(200).json(celeb);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.delete('/:id', async (req, res) => {
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
    res.status(500).json(error);
  }
});

module.exports = router;
