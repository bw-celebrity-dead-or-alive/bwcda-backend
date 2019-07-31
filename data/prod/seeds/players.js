const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(12);

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('players')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('players').insert([
        {
          name: 'Ikechukwu',
          email: 'ike@deal.com',
          password: bcrypt.hashSync('ikechukwu', salt)
        },
        {
          name: 'Kristin',
          email: 'kris@deal.co',
          password: bcrypt.hashSync('kristin', salt)
        },
        {
          name: 'Jeff',
          email: 'jeff@deal.co',
          password: bcrypt.hashSync('jeff', salt)
        },
        {
          name: 'Melissa',
          email: 'mel@deal.co',
          password: bcrypt.hashSync('melisa', salt)
        },
        {
          name: 'Michael',
          email: 'miko@deal.co',
          password: bcrypt.hashSync('michael', salt)
        },
        {
          name: 'Timothy',
          email: 'tim@deal.co',
          password: bcrypt.hashSync('timothy', salt)
        }
      ]);
    });
};
