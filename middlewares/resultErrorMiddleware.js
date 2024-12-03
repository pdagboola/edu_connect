const resultErrorMiddleware = (schema) => (req, res, next) => {
  const result = schema.safeParse(req.body);

  if (result.error) {
    return res.status(400).json({
      success: false,
      errors: result.error.errors.map((error) => error.message),
    });
  }

  req.validatedData = result.data;
  next();
};

module.exports = resultErrorMiddleware;
