exports.up = function(knex, Promise) {
    return knex.schema.createTable("plants", table => {
      table.increments();
      table.string("name", 255).notNullable();
      table.text("description");
      table.date('last_water');
      table.integer("userId")
        .references('id')
        .inTable('users')
        .onDelete('CASCADE');
    });
  };
  
  exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists("plants");
  };