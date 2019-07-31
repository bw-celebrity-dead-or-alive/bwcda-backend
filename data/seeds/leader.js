exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('leaderboard')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('leaderboard').insert([
        { id: 1, player_id: 1, score: 87 },
        { id: 2, player_id: 2, score: 98 },
        { id: 3, player_id: 3, score: 90 },
        { id: 4, player_id: 4, score: 92 },
        { id: 5, player_id: 5, score: 95 },
        { id: 6, player_id: 5, score: 93 },
        { id: 7, player_id: 6, score: 89 },
        { id: 8, player_id: 6, score: 87 }
      ]);
    });
};
