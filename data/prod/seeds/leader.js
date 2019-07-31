exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('leaderboard')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('leaderboard').insert([
        { player_id: 1, score: 87 },
        { player_id: 2, score: 98 },
        { player_id: 3, score: 90 },
        { player_id: 4, score: 92 },
        { player_id: 5, score: 95 },
        { player_id: 5, score: 93 },
        { player_id: 6, score: 89 },
        { player_id: 6, score: 87 }
      ]);
    });
};
