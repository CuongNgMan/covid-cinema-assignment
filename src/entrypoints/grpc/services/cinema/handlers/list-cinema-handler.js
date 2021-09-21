const { ListCinemaSeat } = require('../../../../../configuration/application');
const { errorHelper } = require('../../../../../common/error-helper');

module.exports.listCinemaSeat = async function listCinemaSeat(call, callback) {
  // const nodeId = call.request.node_id;
  // const metadata = { traceContext: call.metadata.get("x-request-id")[0] };

  try {
    const token = call.metadata.get('Authorization')[0];
    const { reserveStatus } = call.request;
    const metadata = { token };

    const interactor = new ListCinemaSeat();

    const [cinemaData, totalSeat] = await interactor.execute({ reserveStatus }, metadata);

    return callback(null, { data: cinemaData, totalSeat });
  } catch (error) {
    console.error(`Error handling listCinemaSeat ${JSON.stringify(error.stack)}`);
    return callback(errorHelper(error), null);
  }
};
