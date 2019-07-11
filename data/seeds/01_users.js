
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users')
  .truncate()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {id: 1, 
        username: 'kgamel', 
        password: 'admin12', 
       phoneNumber: '2546247290'},
        
        {id: 2, 
        username: 'mdiaz', 
        password: 'admin1', 
        phoneNumber: '2546247290'}
      ]);
    });
};
