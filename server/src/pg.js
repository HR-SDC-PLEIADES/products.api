const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'sdc_products',
  password: 'password',
  port: '5432',
});

pool.on('error', (err, client) => {
  console.log('Error:', err);
});

module.exports = pool;
