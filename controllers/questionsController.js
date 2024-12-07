require("dotenv").config();
const askQuestionSchema = require("../schemas/questionSchema/askQuestionSchema");
const {
  createQuestion,
  getQuestions,
  getQuestionsByUser,
} = require("../models/questionsModel");
const jwt = require("jsonwebtoken");
const askQuestion = async (req, res) => {
  try {
    const result = askQuestionSchema.safeParse(req.body);
    const authHeader = req.headers.authorization;
    const token = authHeader.split(" ")[1];
    const user = jwt.verify(token, process.env.SECRET_KEY);
    const asked_by = user.sub;
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
    console.log(newTags);
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
    // const token = req.headers.authorization.split(" ")[1];
    // const user = jwt.verify(token, process.env.SECRET_KEY);
    console.log("user", req.user);

    const { id } = req.user;
    const questions = await getQuestionsByUser(id);
    console.log(questions);
    return res.status(200).json({ success: true, data: questions });
  } catch (err) {
    return res.status(500).json({ success: false, err: err.message });
  }
};
module.exports = { askQuestion, allQuestions, questionsByUser };
