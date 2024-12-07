require("dotenv").config();
const askQuestionSchema = require("../schemas/questionSchema/askQuestionSchema");
const {
  createQuestion,
  getQuestions,
  getQuestionsByUser,
  getQuestionsById,
} = require("../models/questionsModel");
const jwt = require("jsonwebtoken");
const askQuestion = async (req, res) => {
  try {
    const asked_by = req.user.id;
    if (result.error) {
      return res.status(400).json({
        success: false,
        err: result.error.errors.map((error) => {
          error.message;
        }),
      });
    }
    const { question, subject, tags } = result.data;
    const date_asked = new Date().toISOString();
    const newTags = JSON.stringify(tags.split(","));
    await createQuestion(question, asked_by, subject, newTags, date_asked);
    return res
      .status(200)
      .json({ success: true, data: "Question asked successfully" });
  } catch (err) {
    return res.status(500).json({ success: false, err: err.message });
  }
};

const allQuestions = async (req, res) => {
  try {
    const questions = await getQuestions();
    return res.status(200).json({ success: true, data: questions });
  } catch (err) {
    return res.status(500).json({ success: false, err: err.message });
  }
};

const questionsByUser = async (req, res) => {
  try {
    const { id } = req.user;
    const questions = await getQuestionsByUser(id);
    return res.status(200).json({ success: true, data: questions });
  } catch (err) {
    return res.status(500).json({ success: false, err: err.message });
  }
};

const questionsById = async (req, res) => {
  try {
    const { id } = req.params;
    const question = await getQuestionsById(id);
    return res.status(200).json({ success: true, data: question });
  } catch (err) {
    return res.status(500).json({ success: false, err: err.message });
  }
};
module.exports = { askQuestion, allQuestions, questionsByUser, questionsById };
