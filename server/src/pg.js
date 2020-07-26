const { Pool } = require('pg');
console.log(process.env.user || 'postgres');
console.log(process.env.host || 'localhost');
console.log(process.env.database || 'sdc_products');
console.log(process.env.password || 'password');
console.log(process.env.port || '5432');

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
