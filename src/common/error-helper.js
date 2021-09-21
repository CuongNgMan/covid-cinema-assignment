const grpc = require("grpc");

const { CustomErrorEnum } = require("./custom-error-enum");

module.exports.errorHelper = function errorHelper(error, fallbackMessage = "An unexpected error occurred") {
  const metadata = new grpc.Metadata();

  if (CustomErrorEnum[error.code]) {
    return { code: CustomErrorEnum[error.code].grpcCode, message: error.message, metadata };
  }

  return { code: grpc.status.INTERNAL, message: fallbackMessage, metadata };
};
