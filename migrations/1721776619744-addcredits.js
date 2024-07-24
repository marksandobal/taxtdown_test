'use strict'

module.exports.up = function (pgm) {
  pgm.createTable('credits', {
    id: 'id',
    name: { type: 'varchar(255)', notNull: true },
    amount: { type: 'float', notNull: true },
    active: { type: 'boolean', notNull: true, default: true },
    created_at: { type: 'timestamp', notNull: true, default: pgm.func('current_timestamp') },
    updated_at: { type: 'timestamp', notNull: true, default: pgm.func('current_timestamp') },
  })
}

module.exports.down = function (pgm) {

}
