exports.up = function(knex, Promise) {
    return knex.schema.createTable('news',function (table) {
        table.increments();
        table.string('Title');
        table.text('Content');
        table.dateTime('Date');
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('news');
};