const { Pool } = require('pg');

// pgsql connection cofig
const pool = new Pool ({
    user: 'postgres',
    host: 'localhost',
    database: 'user_registration',
    password: '1234'
})

module.exports = pool;