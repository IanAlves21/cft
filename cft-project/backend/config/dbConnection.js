const Pool = require('pg').Pool

const pool = new Pool({
  user: 'elgin',
  host: 'localhost',
  database: 'db_cft',
  password: 'elgin',
  port: 5432
})

module.exports = function() {
  return pool;
}