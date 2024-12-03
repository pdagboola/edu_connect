const pool = require("../config/pool");

const createUser = async (
  username,
  password,
  name,
  email,
  date_joined,
  communities,
  interests
) => {
  const { rows } = await pool.query(
    `INSERT INTO users(username, password, name, email, date_joined, communities, interests) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING username, id;`,
    [username, password, name, email, date_joined, communities, interests]
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

module.exports = { createUser, getUserById, getUserByEmail };
