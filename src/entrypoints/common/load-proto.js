const path = require("path");
const grpc = require("grpc");
const protoLoader = require("@grpc/proto-loader");

module.exports.loadProto = (filePath, externalDirs = []) => {

  const options = {
    keepCase: true,
    longs: String,
    enums: String,
    oneofs: true,
    includeDirs: [],
  };

  const protoDefinition = protoLoader.loadSync(filePath, options);
  return grpc.loadPackageDefinition(protoDefinition);
};
