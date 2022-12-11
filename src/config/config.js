// src/config/config.js

require('dotenv').config();

const config = {
  username: process.env.MYSQLUSER,
  password: process.env.MYSQLPASSWORD,
  database: process.env.MYSQLDATABASE,
  host: process.env.MYSQLHOST,
  dialect: 'mysql',
};

module.exports = {
  development: config,
  test: config,
  production: config,
};