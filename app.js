require("dotenv").config();
const express = require("express");
const userRoute = require("./routes/userRoute");
const questionRoute = require("./routes/questionRoute");
const PORT = process.env.PORT;
const session = require("express-session");
const authRoute = require("./routes/authRoute");
// const https = require("https");

const app = express();
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/user", userRoute);
app.use("/question", questionRoute);
app.use("/auth", authRoute);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Your app is currently running on ${PORT}`);
});

// https.createServer(options, app).listen(PORT, () => {
//   console.log(`Secure server is running on port ${PORT}`);
// });
