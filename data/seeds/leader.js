exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('leaderboard')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('leaderboard').insert([
        { id: 1, firstName: 'Ikechukwu', lastName: 'Eze', score: 87 },
        { id: 2, firstName: 'Kristin', lastName: 'Barr', score: 98 },
        { id: 3, firstName: 'Jeff', lastName: 'Butler', score: 90 },
        { id: 4, firstName: 'Melissa', lastName: 'Kemp', score: 92 },
        { id: 5, firstName: 'Michael', lastName: 'Demery', score: 95 },
        { id: 6, firstName: 'Timothy', lastName: 'McGowen', score: 89 }
      ]);
    });
};
