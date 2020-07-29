const { Pool } = require('pg');

const pool = new Pool({
  user: process.env.user || 'postgres',
  host: process.env.host || 'localhost',
  database: process.env.database || 'sdc_products',
  password: process.env.password || 'password',
  port: process.env.port || '5432',
});

pool.on('error', (err, client) => {
  console.log('Error:', err);
});

module.exports = pool;
