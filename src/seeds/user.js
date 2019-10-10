
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {id: 1, UserName: 'Admin', Password: 'admin', DistributorId: 0, Status:'Admin'}
      ]);
    });
};

