const grpc = require("grpc");

const CustomErrorEnum = {
  InternalError: {
    errorCode: "InternalError",
    grpcCode: grpc.status.INTERNAL,
  },
  PermissionDenied: {
    errorCode: "PermissionDenied",
    grpcCode: grpc.status.PERMISSION_DENIED,
  },
  MissingAuthorization: {
    errorCode: "MissingAuthorization",
    grpcCode: grpc.status.UNAUTHENTICATED,
  },
  InvalidParameter: {
    errorCode: "InvalidParameter",
    grpcCode: grpc.status.INVALID_ARGUMENT,
  },
  MissingRequiredParameter: {
    errorCode: "MissingRequiredParameter",
    grpcCode: grpc.status.INVALID_ARGUMENT,
  },
};

module.exports.CustomErrorEnum = CustomErrorEnum;
