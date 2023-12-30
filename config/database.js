const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    port: process.env.DB_port,
    host: process.env.DB_host,
    user: process.env.DB_user,
    database: process.env.DB_database,
    password: process.env.DB_password,
    waitForConnections: true,
    connectionLimit: 10, 
    queueLimit: 0
  });


  // const pool = mysql.createPool({
  //   port: '3306',
  //   host: 'localhost',
  //   user: 'silverbacktech_aussie_bank_schema',
  //   database: 'silverbacktech_aussie_bank_schema',
  //   password: 'Myfather123@u',
  //   waitForConnections: true,
  //   connectionLimit: 10,
  //   queueLimit: 0
  // });


  module.exports = pool;