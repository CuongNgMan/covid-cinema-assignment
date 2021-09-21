const grpc = require('grpc');

const { entityService } = require('./services/cinema/cinema-service');

module.exports.gRPCServer = class {
  constructor(options) {
    this.port = options.port;
    this.logger = console;
    this.services = [entityService];
  }

  listen() {
    try {
      this.server = new grpc.Server();
      this.loadServices();
      this.server.bind(`0.0.0.0:${this.port}`, grpc.ServerCredentials.createInsecure());
      this.server.start();
      this.logger.info(`Server started at port ${this.port}`);
    } catch (error) {
      this.logger.error(`Error on starting server ${JSON.stringify(error.stack)}`);
      process.kill(process.pid);
    }
  }

  loadServices() {
    this.services.forEach((service) => this.server.addService(service.service, service.handlers));
  }
};
