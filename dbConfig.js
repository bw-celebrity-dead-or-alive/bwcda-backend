const knex = require('knex');
const config = require('./knexfile')[process.env.NODE_ENV || 'development'];
// const config = require('./knexfile').production;

module.exports = knex(config);
