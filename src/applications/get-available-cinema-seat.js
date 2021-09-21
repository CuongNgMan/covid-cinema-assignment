const jwt = require('jsonwebtoken');

const { CustomError } = require('../common/custom-error');
const { CustomErrorEnum } = require('../common/custom-error-enum');

module.exports.GetAvailableCinemaSeat = class {
  constructor(options) {
    this.data = options.infra.data;
  }

  async execute(metadata) {
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

    const cinemaData = this.data.getCinemaData();

    let availableSeat = null;

    for(let i = 0; i < cinemaData.length; i++) {
      availableSeat = cinemaData[i].find(seat => !seat.reserved)
      if(availableSeat) {
        break;
      }
    }

    return Promise.resolve(availableSeat)
  }
}