const { z } = require("zod");

const userCreateSchema = z.object({
  username: z
    .string()
    .min(8, { message: "Username should be a minimum of 8 characters" }),
  email: z
    .string()
    .email({ message: "Invalid email address" })
    .min(1, { message: "email is required" }),
  first_name: z.string().min(1, { message: "First name is required" }),
  last_name: z.string().min(1, { message: "Second name is required" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" })
    .max(128, { message: "Password can only be a maximum of 128 characters" }),
});

module.exports = userCreateSchema;
