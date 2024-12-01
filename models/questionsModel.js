const pool = require("../config/pool");

const createQuestion = async (
  question,
  asked_by,
  subject,
  tags,
  date_asked
) => {
  await pool.query(
    `INSERT INTO questions(question, asked_by, subject, tags, date_asked) VALUES ($1, $2, $3, $4, $5);`,
    [question, asked_by, subject, tags, date_asked]
  );
};
const getQuestions = async () => {
  const { rows } = await pool.query(`SELECT * FROM questions;`);
  return rows;
};
const getQuestionsByUser = async (id) => {
  const { rows } = await pool.query(
    `SELECT * FROM questions where asked_by = $1`,
    [id]
  );
  return rows;
};

module.exports = { getQuestions, getQuestionsByUser, createQuestion };
