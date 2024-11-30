const { z } = require("zod");

const askQuestionSchema = z.object({
  question: z.string().min(1, { message: "A question is required" }),
  subject: z.string().min(1, { message: "Specify what subject this is!" }),
  tags: z.string().min(1, { message: "Add a tag" }),
});

module.exports = askQuestionSchema;
