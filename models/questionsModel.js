const pool = require("../config/pool");

const createQuestion = async (
  question,
  asked_by,
  subject,
  tags,
  date_asked
) => {
  await pool.query(
    `INSERT INTO questions(question, question, asked_by, subject, tags, date_asked) VALUES ($1, $2, $3, $4, $5, $6);`,
    [question, asked_by, subject, tags, date_asked]
  );
};
const getQuestions = async () => {
  await pool.query(`SELECT * FROM questions;`);
};
const getQuestionsByUser = async (id) => {
  await pool.query(`SELECT * FROM questions where asked_by = $1`, [id]);
};

module.exports = { getQuestions, getQuestionsByUser, createQuestion };
