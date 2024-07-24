'use strict'

module.exports.up = function (pgm) {
  pgm.createTable('available_credits', {
    id: 'id',
    user_id: { type: 'integer', notNull: true },
    credit_id: { type: 'integer', notNull: true },
    amount: { type: 'float', notNull: true },
    created_at: { type: 'timestamp', notNull: true, default: pgm.func('current_timestamp') },
    updated_at: { type: 'timestamp', notNull: true, default: pgm.func('current_timestamp') },
  })
}

module.exports.down = function (pgm) {

}
