exports.up = function(knex, Promise) {
    return knex.schema.createTable("users", table => {
      table.increments();
      table
        .string("username", 255)
        .notNullable()
        .unique();
      table.string("password", 255)
      table.string("email", 255)
      .notNullable()
      .unique
      table.string("phoneNumber", 255)
      
    });
  };
  
  exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists("users");
  };