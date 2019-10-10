exports.up = function(knex, Promise) {
    return knex.schema.createTable('smartTips',function (table) {
        table.increments();
        table.string('Title');
        table.text('Content');
        table.dateTime('Date');
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('smartTips');
};