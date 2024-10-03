const { ValidationError } = require("sequelize");

function logErrors(err, req, res, next) {
  console.error(err);
  next(err);
}

function errorHandler(err, req, res, next) {
  console.error(err);
  res.status(500).json({
    statusCode: 500,
    message: "An error occurred on the server.",
    error: err.message,
    data: null
  });
  next(err);
}

function ormErrorHandler(err, req, res, next) {
  if (err instanceof ValidationError) {
    res.status(409).json({
      statusCode: 409,
      message: err.name,
      errors: err.errors,
    });
  }
  next(err);
}

function boomErrorHandler(err, req, res, next) {
  if (err.isBoom) {
    const { output } = err;
    res.status(output.statusCode).json(output.payload);
  }
  next(err);
}


module.exports = { logErrors, errorHandler, ormErrorHandler, boomErrorHandler };
