// .migraterc.js
module.exports = {
  migrationDirectory: '/dist/migrations',
  driver: pg,
  db: {
    url: process.env.DATABASE_URL,
  },
  log: false,
  migrationsTable: "migrations",
  multipleStatements: true
};
