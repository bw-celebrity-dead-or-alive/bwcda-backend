require('dotenv').config();
const server = require('./api/server');
const PORT = process.env.PORT || 4000;

server.get('/', (req, res) => {
  res.status(200).json('Api exposed at /api');
});

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
