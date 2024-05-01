const errorHandler = (statusCode, errorMessage) => {
  const err = new Error();
  err.statusCode = statusCode;
  err.message = errorMessage;
  return err;
};

module.exports = errorHandler;
