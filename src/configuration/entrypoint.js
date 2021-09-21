const { gRPCServer } = require('../entrypoints/grpc/grpc-server');

/**
 * Init gRPC Server
 */
new gRPCServer({
  port: process.env.ENTRYPOINT_GRPC_PORT,
}).listen();
