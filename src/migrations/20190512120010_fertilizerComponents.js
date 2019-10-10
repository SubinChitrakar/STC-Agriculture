
exports.up = function(knex, Promise) {
    return knex.schema.createTable('fertilizerComponents',function (table) {
        table.increments();
        table.integer('FertilizerID').references('id').inTable('fertilizer');
        table.string('ChemicalComponent');
        table.integer('Percentage');
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('fertilizerComponents');
};
