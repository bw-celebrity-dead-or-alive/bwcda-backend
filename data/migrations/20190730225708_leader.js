exports.up = function(knex) {
  return knex.schema.createTable('leaderboard', tbl => {
    tbl.increments();
    tbl.text('firstName', 128).notNullable();
    tbl.text('lastName', 128).notNullable();
    tbl.integer('score').notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('leaderboard');
};
