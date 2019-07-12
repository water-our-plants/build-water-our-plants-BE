
exports.up = function(knex, Promise) {
    return knex.schema.createTable('watering', tbl => {
      tbl.increments('id');
   
      tbl.date('watering_time');
      tbl.boolean("smsDelivered").defaultTo(false);

      tbl.integer('plant_id').references('id').inTable('plants').onDelete('CASCADE');

      tbl.integer('userId').references('id').inTable('users').onDelete('CASCADE');

    });
  };
  
exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('watering');
};
