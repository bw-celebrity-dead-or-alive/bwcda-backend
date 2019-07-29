const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const celebRouter = require('./celebrity/celeb.router');

const server = express();
server.use(helmet());
server.use(cors());
server.use(express.json());
server.use('/api/celebrities', celebRouter);

module.exports = server;
