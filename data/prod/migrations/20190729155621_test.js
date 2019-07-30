exports.up = function(knex) {
  return knex.schema.createTable('celebrities', tbl => {
    tbl.increments();
    tbl
      .text('name', 128)
      .notNullable()
      .unique();
    tbl.text('info').notNullable();
    tbl.text('image_url');
    tbl.integer('birth').notNullable();
    tbl
      .integer('death')
      .defaultTo(0)
      .notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('celebrities');
};
