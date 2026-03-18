const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'tourism_db',
  password: 'lakhu123#',
  port: 5433,
});

module.exports = pool;