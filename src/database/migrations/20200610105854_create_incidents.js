exports.up = function(knex) {
  return knex.schema.createTable('incidents', function (table) {
    table.increments(); // primary key

    table.string('title').notNullable(); // table fields
    table.string('description').notNullable(); // table fields
    table.string('value').notNullable(); // table fields

    table.string('ong_id').notNullable(); // ONG id

    table.foreign('ong_id').references('id').inTable('ongs'); // Foreign key
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('incidents');
};
