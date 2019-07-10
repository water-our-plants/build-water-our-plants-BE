exports.up = function(knex, Promise) {
    return knex.schema.createTable('plants', table => {
      table.increments();
      table.string('name', 255).notNullable();
      table.text('description', 255);
      table.date('lastWater');
      table.date('nextWater');
      table.integer('userId')
        .references('id')
        .inTable('users')
        .onDelete('CASCADE');
    });
  };
  
  exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('plants');
  };