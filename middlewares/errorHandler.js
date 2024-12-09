const errorHandler = (err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: err.message || "Something went wrong!" });
};

module.exports = errorHandler;
