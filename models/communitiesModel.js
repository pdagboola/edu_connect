const pool = require("../config/pool");

const insertCommuntities = async (communities) => {
  await pool.query(`INSERT INTO communities (name) VALUES $1`, [communities]);
};

module.exports = { insertCommuntities };
