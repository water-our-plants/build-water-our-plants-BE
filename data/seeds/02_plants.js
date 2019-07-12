
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('plants')
  .truncate()
    .then(function () {
      // Inserts seed entries
      return knex('plants').insert([
        {userId: 1, 
        name: 'Snake Plant', description: 'plant in office on the desk', 
        lastWater: "2019-07-07"  },
        
        {userId: 2, 
          name: 'Peace Lily', description: 'plant in living room', 
          lastWater: "2019-07-01" }
        
      ]);
    });
};
