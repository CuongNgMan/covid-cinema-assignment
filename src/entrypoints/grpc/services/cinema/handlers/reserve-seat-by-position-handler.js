const { ReserveSeatByPosition } = require('../../../../../configuration/application');
const { errorHelper } = require('../../../../../common/error-helper');

module.exports.reserveSeatByPosition = async function reserveSeatByPosition(call, callback) {
  // const nodeId = call.request.node_id;
  // const metadata = { traceContext: call.metadata.get("x-request-id")[0] };

  try {
    const token = call.metadata.get('Authorization')[0];
    const metadata = { token };
    const { row, column } = call.request;

    const interactor = new ReserveSeatByPosition();

    const result = await interactor.execute({ row, column }, metadata);

    // TODO: replace hard code
    return callback(null, result);
  } catch (error) {
    console.error(`Error handling reserveSeatByPosition ${JSON.stringify(error.stack)}`);
    return callback(errorHelper(error), null);
  }
};
