require("dotenv").config({
  path: "/Users/apple/Desktop/code/edu_connect/config/.env",
});
const { createUser, getUserByEmail } = require("../models/userModel");
const userLoginSchema = require("../schemas/userSchema/loginUserSchema");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const checkIfUserExists = require("../services/userService");

const registerUserPost = async (req, res) => {
  try {
    const {
      username,
      password,
      first_name,
      last_name,
      email,
      interests,
      communities,
    } = req.validatedData;
    const name = `${first_name.trim("")} ${last_name.trim("")}`;
    const new_password = await bcrypt.hash(password, 10);
    const userExists = await checkIfUserExists(email);
    if (userExists) {
      return res
        .status(400)
        .json({ success: false, err: "This user already exists" });
    }
    const date_joined = new Date().toISOString();
    await createUser(
      username,
      new_password,
      name,
      email,
      date_joined,
      interests,
      communities
    );
    return res
      .status(200)
      .json({ succes: true, data: "User created sucessfully" });
  } catch (err) {
    return res.status(500).json({ success: false, err: err.message });
  }
};
const loginUserPost = async (req, res) => {
  try {
    const result = userLoginSchema.safeParse(req.body);
    if (result.error) {
      return res.status(400).json({
        success: false,
        error: result.error.errors.map((error) => {
          error.message;
        }),
      });
    }
    const { email, password } = result.data;
    const rows = await getUserByEmail(email);
    if (rows.length === 0) {
      return res
        .status(401)
        .json({ success: false, err: "Invalid username/password" });
    }
    const user = rows[0];
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res
        .status(401)
        .json({ success: false, err: "Invalid username/password" });
    }
    const token = jwt.sign(
      { sub: user.id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    delete user.password;
    return res.status(200).json({
      success: true,
      data: "Login succesful",
      token: token,
      user: user,
    });
  } catch (err) {
    return res.status(500).json({ success: false, err: err.message });
  }
};

module.exports = { registerUserPost, loginUserPost };
