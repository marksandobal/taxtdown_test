'use strict'

module.exports.up = function (pgm) {
  pgm.addConstraint('available_credits', 'fk_available_credits_user_id', {
    foreignKeys: {
      columns: 'user_id',
      references: 'users(id)',
    },
  });

  pgm.addConstraint('available_credits', 'fk_available_credits_credit_id', {
    foreignKeys: {
      columns: 'credit_id',
      references: 'credits(id)',
    },
  });

  pgm.createIndex('available_credits', 'user_id')
  pgm.createIndex('available_credits', 'credit_id')
}


module.exports.down = function (pgm) {

}
