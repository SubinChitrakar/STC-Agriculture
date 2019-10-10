
exports.up = function(knex, Promise) {
    return knex.schema.createTable('users',function (table) {
        table.increments();
        table.string('UserName');
        table.string('Password');
        table.integer('DistributorId');
        table.string('Status');
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('users');
};

