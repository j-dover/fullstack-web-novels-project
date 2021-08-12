const { Pool } = require('pg');
// const config = require('./config/config.json');

const pool = new Pool({
  "user": "postgres",
  "host": "localhost",
  "database": "webvel",
  "password": "password",
  "port": 5432
});

exports.pool = pool;

module.exports = pool;
