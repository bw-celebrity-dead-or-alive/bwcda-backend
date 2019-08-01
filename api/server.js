const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const celebRouter = require('./celebrity/celeb.router');
const leaderRouter = require('./leaderboard/leader.router');
const authRouter = require('./players/player.auth');
const playersRouter = require('./players/player.router');

const server = express();
server.use(helmet());
server.use(cors());
server.use(express.json());

server.get('/', (req, res) => {
  res.status(200).json('Api exposed at /api');
});

server.use('/api/celebrities', celebRouter);
server.use('/api/leaderboard', leaderRouter);
server.use('/api/auth', authRouter);
server.use('/api/players', playersRouter);

module.exports = server;
