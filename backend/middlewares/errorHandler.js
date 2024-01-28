module.exports = (error, req, res, next) => {
  const statusCode = res.statusCode || res.code || res.status || 500;
  const stack =
    process.env.NODE_ENV === "development"
      ? error.stack
      : "Something went wrong";
  res.status(statusCode).json({ code: statusCode, stack: stack });
};
