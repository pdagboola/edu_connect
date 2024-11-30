require("dotenv").config();
const askQuestionSchema = require("../schemas/questionSchema/askQuestionSchema");
const { createQuestion } = require("../models/questionsModel");
const jwt = require("jsonwebtoken");
const askQuestion = async (req, res) => {
  try {
    const result = askQuestionSchema.safeParse(req.body);
    const authHeader = req.headers.authorization;
    const token = authHeader.split(" ")[1];

    console.log(token);
    const user = jwt.verify(token, process.env.SECRET_KEY);
    const asked_by = user.id;
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

    await createQuestion(question, asked_by, subject, tags, date_asked);
    return res
      .status(200)
      .json({ success: true, data: "Question asked successfully" });
  } catch (err) {
    return res.status(500).json({ success: false, err: err.message });
  }
};

module.exports = askQuestion;
