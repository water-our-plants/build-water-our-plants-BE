
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('plants')
  .truncate()
    .then(function () {
      // Inserts seed entries
      return knex('plants').insert([
          {userId: 1, 
          name: 'Snake Plant', 
          description: 'plant in office on the desk', 
          watering_time: "2019-07-17",
          smsDelivered: "1",
          lastWater: "2019-07-07"  },
          
          {userId: 2, 
            name: 'Peace Lily', 
            description: 'plant in living room', 
            watering_time: "2019-07-18",
            smsDelivered: "1",
            lastWater: "2019-07-01" },

          {userId: 2, 
            name: 'Parlor Palm', 
            description: 'plant in living room', 
            watering_time: "2019-07-17",
            smsDelivered: "1",
            lastWater: "2019-07-11" },

          {userId: 1, 
            name: 'Pothos', 
            description: 'entry way',
            watering_time: "2019-07-19",
            smsDelivered: 1, 
            lastWater: "2019-07-13" },

          {userId: 1, 
            name: 'Fiddle Leaf Fig', 
            description: 'plant in living room', 
            watering_time: "2019-07-19",
            smsDelivered: 1,
            lastWater: "2019-07-08" }
        
      ]);
    });
};
