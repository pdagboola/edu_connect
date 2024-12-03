const pool = require("../config/pool");

const createUser = async (username, password, name, email, date_joined) => {
  const { rows } = await pool.query(
    `INSERT INTO users(username, password, name, email, date_joined) VALUES ($1, $2, $3, $4, $5) RETURNING username, id;`,
    [username, password, name, email, date_joined]
  );
  return rows;
};

const createUserByGoogleID = async (name, google_id, email, date_joined) => {
  const rows = await pool.query(
    `INSERT INTO users(name, google_id, email, date_joined) VALUES ($1, $2, $3, $4, $5) RETURNING *;`,
    [name, google_id, email, date_joined]
  );
  return rows;
};

const getUserById = async (id) => {
  const { rows } = await pool.query(`SELECT * FROM users WHERE id = $1;`, [id]);
  return rows;
};
const getUserByEmail = async (email) => {
  const { rows } = await pool.query(
    `SELECT * FROM users WHERE email LIKE $1;`,
    [email]
  );
  return rows;
};
const getUserByGoogleId = async (googleId) => {
  const { rows } = await pool.query(
    `SELECT * FROM users WHERE google_id = $1;`,
    [googleId]
  );
  return rows;
};

module.exports = {
  createUser,
  getUserById,
  getUserByEmail,
  getUserByGoogleId,
  createUserByGoogleID,
};
