const express = require("express");
const userRoute = require("./routes/userRoute");
const PORT = 3030;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/", userRoute);

app.listen(PORT, () => {
  console.log(`Your app is currently running on ${PORT}`);
});
