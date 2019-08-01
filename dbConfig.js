const knex = require('knex');
const config = require('./knexfile')[process.env.NODE_ENV || 'development'];
// const config = require('./knexfile').development;

module.exports = knex(config);
