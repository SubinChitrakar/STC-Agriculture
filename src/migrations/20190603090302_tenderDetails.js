
exports.up = function(knex, Promise) {
    return knex.schema.createTable('tenderDetails',function (table) {
        table.increments();
        table.integer('TenderId').references('id').inTable('tender');
        table.integer('FertilizerId').references('id').inTable('fertilizer');
        table.integer('ImportPrice');
        table.integer('SellingPrice');
        table.integer('Quantity');
        table.string('Remarks');
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('tenderDetails');
};