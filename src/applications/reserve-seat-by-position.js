const jwt = require('jsonwebtoken');

const { CustomError } = require('../common/custom-error');
const { CustomErrorEnum } = require('../common/custom-error-enum')

module.exports.ReserveSeatByPosition = class {
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

    let result;
    const { row, column } = data;

    const cinemaData = this.data.getCinemaData();

    let currentSeat;
    try {
      currentSeat = cinemaData[row][column];
    } catch (error) {
      console.error(`[reserve-seat-by-position] Invalid row ${row} - col: ${column} Error ${JSON.stringify(error.message)}`);
      throw error;
    }

    if (currentSeat) {
      if (currentSeat.reserved === false) {
        this.data.reserveSeatAt(row, column);
        result = {
          success: true,
          status: `Seat at row ${row} - col ${column} reserved`,
        };
      } else {
        result = {
          success: false,
          status: `Seat at row ${row} - col ${column} had been reserved`,
        };
      }
    } else {
      result = {
        success: false,
        status: `Seat at row ${row} - col ${column} not exist`,
      }
    }

    return Promise.resolve(result);
  }
};
