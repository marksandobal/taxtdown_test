'use strict'

module.exports.up = (pgm) => {
  pgm.createTable('users', {
    id: 'id',
    name: { type: 'varchar(50)', notNull: true },
    last_name: { type: 'varchar(50)', notNull: true },
    email: { type: 'varchar(50)', notNull: true },
    password: { type: 'varchar(200)', notNull: true },
    created_at: {
      type: 'timestamp',
      notNull: true,
      default: pgm.func('current_timestamp'),
    },
    updated_at: {
      type: 'timestamp',
      notNull: true,
      default: pgm.func('current_timestamp'),
    },
  });

  module.exports.down = (pgm) => {

  }
};
