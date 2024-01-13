// db.js
const pgp = require("pg-promise")();
require("dotenv").config(); // Load environment variables from .env

// Configure your PostgreSQL connection
const db = pgp({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

module.exports = db;
