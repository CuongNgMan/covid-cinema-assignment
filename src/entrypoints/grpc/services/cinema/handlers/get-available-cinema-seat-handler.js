const { GetAvailableCinemaSeat } = require('../../../../../configuration/application');
const { errorHelper } = require("../../../../../common/error-helper")

module.exports.getAvailableCinemaSeat = async function getAvailableCinemaSeat(call, callback) {
  // const nodeId = call.request.node_id;
  // const metadata = { traceContext: call.metadata.get("x-request-id")[0] };

  try {
    const token = call.metadata.get('Authorization')[0];
    const { reserveStatus } = call.request;
    const metadata = { token };

    const interactor = new GetAvailableCinemaSeat();

    const result = await interactor.execute(metadata);

    return callback(null, { seat: result });
  } catch (error) {
    console.error(`Error handling getAvailableCinemaSeat ${JSON.stringify(error.stack)}`);
    return callback(errorHelper(error), null);
  }
};
