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
          id: 1,
          name: 'Ikechukwu',
          email: 'ike@deal.com',
          password: bcrypt.hashSync('ikechukwu', salt)
        },
        {
          id: 2,
          name: 'Kristin',
          email: 'kris@deal.co',
          password: bcrypt.hashSync('kristin', salt)
        },
        {
          id: 3,
          name: 'Jeff',
          email: 'jeff@deal.co',
          password: bcrypt.hashSync('jeff', salt)
        },
        {
          id: 4,
          name: 'Melissa',
          email: 'mel@deal.co',
          password: bcrypt.hashSync('melisa', salt)
        },
        {
          id: 5,
          name: 'Michael',
          email: 'miko@deal.co',
          password: bcrypt.hashSync('michael', salt)
        },
        {
          id: 6,
          name: 'Timothy',
          email: 'tim@deal.co',
          password: bcrypt.hashSync('timothy', salt)
        }
      ]);
    });
};
