const { ReserveCinemaSeat } = require('../../../../../configuration/application');
const { errorHelper } = require('../../../../../common/error-helper');

module.exports.reserveCinemaSeatHandler = async function reserveCinemaSeatHandler(call, callback) {
  try {
    const token = call.metadata.get('Authorization')[0];
    const metadata = { token };
    const { numberOfSeat } = call.request;

    const interactor = new ReserveCinemaSeat();

    const [result, totalSeat] = await interactor.execute({ numberOfSeat }, metadata);

    return callback(null, {
      seat: result,
      totalReserved: totalSeat,
      totalSeatRequest: numberOfSeat,
    });
  } catch (error) {
    console.error(`Error handling reserveCinemaSeatHandler ${JSON.stringify(error.stack)}`);
    return callback(errorHelper(error), null);
  }
};
