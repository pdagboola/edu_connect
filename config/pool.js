require("dotenv").config({
  path: "/Users/apple/Desktop/code/edu_connect/config/.env",
});
const { Pool } = require("pg");

const pool = new Pool({
  connectionString: process.env.DB_URL,
  ssl: true,
});

module.exports = pool;
