
exports.up = function(knex, Promise) {
    return knex.schema.createTable('tender',function (table) {
        table.increments();
        table.date('DateOfTender');
        table.integer('TotalQuantity');
        table.string('ManufacturedCountry');
        table.string('PortOfImport');
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('tender');
};
