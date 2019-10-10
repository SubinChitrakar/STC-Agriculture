
exports.up = function(knex, Promise) {
    return knex.schema.createTable('distributor',function (table) {
        table.increments();
        table.string('CompanyName');
        table.string('ProprietorName');
        table.string('ContactNo');
        table.string('Email');
        table.string('Longitude');
        table.string('Latitude');
        table.boolean('PAN');
        table.boolean('Citizenship');
        table.boolean('Status');
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('distributor');
};
