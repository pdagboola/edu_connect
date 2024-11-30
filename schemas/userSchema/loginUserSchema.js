const { z } = require("zod");

const userLoginSchema = z.object({
  email: z
    .string()
    .email({ message: "Must be an email address" })
    .min(1, { message: "Email address is required" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" })
    .max(128, { message: "Password can only be a maximum of 128 characters" }),
});

module.exports = userLoginSchema;
