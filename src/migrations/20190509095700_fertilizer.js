
exports.up = function(knex, Promise) {
    return knex.schema.createTable('fertilizer',function (table) {
        table.increments();
        table.string('Name');
        table.string('ChemicalName');
        table.string('Image');
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('fertilizer');
};
