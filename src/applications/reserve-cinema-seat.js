const jwt = require('jsonwebtoken');

const { CustomError } = require('../common/custom-error');
const { CustomErrorEnum } = require('../common/custom-error-enum')

module.exports.ReserveCinemaSeat = class {
  constructor(options) {
    this.data = options.infra.data;
  }

  async execute(data, metadata) {
    const { token } = metadata;

    if(!token) {
      throw new CustomError(CustomErrorEnum.MissingAuthorization, "Missing token")
    }

    const bearerToken = token.split(" ")[1]

    try {
      jwt.verify(bearerToken, process.env.AUTH_SECRET);
    } catch (error) {
      throw new CustomError(CustomErrorEnum.MissingAuthorization, 'Unauthenticated');
    }
    let numberOfSeat = data.numberOfSeat ? data.numberOfSeat : 1;

    if (numberOfSeat === 0) {
      return [[], 0];
    }

    const reservedData = [];

    while (numberOfSeat > 0) {
      const cinemaData = this.data.findOneRowWithMaximumConsecutiveSeat(numberOfSeat);
      const { row, totalSeat, seatIndex } = cinemaData;

      if (totalSeat === 0) {
        break;
      }

      for (let s = 0; s < seatIndex.length; s++) {
        this.data.reserveSeatAt(row, seatIndex[s]);
        reservedData.push({
          row,
          column: seatIndex[s],
          reserved: true,
        });

        numberOfSeat -= 1;

        if (numberOfSeat <= 0) {
          break;
        }
      }
    }

    return [reservedData, reservedData.length];
  }
};
