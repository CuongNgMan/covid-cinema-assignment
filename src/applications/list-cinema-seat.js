const jwt = require('jsonwebtoken');

const { CustomError } = require('../common/custom-error');
const { CustomErrorEnum } = require('../common/custom-error-enum');

module.exports.ListCinemaSeat = class {
  constructor(options) {
    this.data = options.infra.data;
  }

  async execute(data, metadata) {
    const { token } = metadata;

    if (!token) {
      throw new CustomError(CustomErrorEnum.MissingAuthorization, 'Missing token');
    }

    const bearerToken = token.split(' ')[1];

    try {
      jwt.verify(bearerToken, process.env.AUTH_SECRET);
    } catch (error) {
      throw new CustomError(CustomErrorEnum.MissingAuthorization, 'Unauthenticated');
    }

    const { reserveStatus } = data;

    let [cinemaData, length] = this.data.listCinema({ reserveStatus });

    cinemaData = cinemaData.map((v, i) => ({ row: i, seats: v }));

    return Promise.resolve([cinemaData, length]);
  }
};
