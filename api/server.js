const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const celebRouter = require('./celebrity/celeb.router');
const leaderRouter = require('./leaderboard/leader.router');

const server = express();
server.use(helmet());
server.use(cors());
server.use(express.json());
server.use('/api/celebrities', celebRouter);
server.use('/api/leaderboard', leaderRouter);

module.exports = server;
