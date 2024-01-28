module.exports = (carJoiSchema) => {
  return (req, res, next) => {
    const { error } = carJoiSchema.validate(req.body);
    if (error) {
      const message = `Joi validator: ${error.details[0].message}`;
      res.status(400);
      // return next(message)
      throw new Error(message);
    }
    next();
  };
};
