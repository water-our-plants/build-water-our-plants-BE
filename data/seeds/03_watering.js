exports.seed = async function(knex, Promise) {
  return knex('plants')
    //.truncate()
    .then(function(){
      return knex('watering').insert([
        { plant_id:1 , watering_time: '2019-07-18', userID: 2 },
        { plant_id:2 , watering_time: '2019-07-13', userID: 1 },
      ]);
    })
};