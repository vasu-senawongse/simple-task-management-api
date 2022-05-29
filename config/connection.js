var mysql = require('mysql2');
require('dotenv').config();
const util = require('util');
var db = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  insecureAuth: true,
};

const sql = mysql.createPool(db);
sql.getConnection((err, connection) => {
  if (err) {
    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
      console.error('Database connection was closed.');
    }
    if (err.code === 'ER_CON_COUNT_ERROR') {
      console.error('Database has too many connections.');
    }
    if (err.code === 'ECONNREFUSED') {
      console.error('Database connection was refused.');
    }
  }
  if (connection) connection.release();
  return;
});

sql.query = util.promisify(sql.query);
setInterval(function () {
  sql.query('SELECT 1');
}, 5000);

module.exports = sql;
