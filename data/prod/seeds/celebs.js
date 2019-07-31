/* eslint-disable no-unused-vars */
const celebs = require('../../../procels');
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('celebrities')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('celebrities')
        .insert(celebs.slice(0, 150))
        .then(_ => knex('celebrities').insert(celebs.slice(150, 300)))
        .then(_ => knex('celebrities').insert(celebs.slice(300, 350)));
    });
};
