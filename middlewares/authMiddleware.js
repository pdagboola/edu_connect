const jwt = require("jsonwebtoken"); // For JWT verification

const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    console.log("isAuthenticated");
    return next();
  }

  const authHeader = req.headers["authorization"];
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        return res.status(403).send("Invalid token");
      }
      req.user = user;
      return next();
    });
  } else {
    return res.status(401).send("Unauthorized");
  }
};

module.exports = isAuthenticated;
