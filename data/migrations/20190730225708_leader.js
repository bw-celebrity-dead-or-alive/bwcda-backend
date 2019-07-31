exports.up = function(knex) {
  return knex.schema
    .createTable('players', tbl => {
      tbl.increments();
      tbl.text('name', 128).notNullable();
      tbl.text('email', 128).unique();
      tbl.text('password');
    })
    .createTable('leaderboard', tbl => {
      tbl.increments();
      tbl.integer('score').notNullable();
      tbl
        .integer('player_id')
        .unsigned()
        .references('id')
        .inTable('players')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
      tbl.timestamps(true, true);
    });
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists('players')
    .dropTableIfExists('leaderboard');
};
