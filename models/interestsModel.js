const pool = require("../config/pool");

const getAllInterests = async () => {
  const { rows } = await pool.query(`SELECT * FROM interests`);
  return rows;
};

const insertInterests = async (interests) => {
  await pool.query(`INSERT INTO interests(name) VALUES $1`, [interests]);
};

module.exports = { getAllInterests, insertInterests };
