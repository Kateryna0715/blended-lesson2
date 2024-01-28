const { isValidObjectId } = require("mongoose");

module.exports = (req, res, next) => {
  if (!isValidObjectId(req.params.id)) {
    res.status(400);
    throw new Error(`ID: ${req.params.id} is not valid`);
  }
  next();
};
