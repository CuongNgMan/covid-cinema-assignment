const jwt = require('jsonwebtoken');

const { CustomError } = require('../common/custom-error');
const { CustomErrorEnum } = require('../common/custom-error-enum');

module.exports.Login = class {
  constructor(options) {
    this.data = options.infra.data;
    this.userData = options.infra.userData;
  }

  validateMail(email) {
    // RFC2822
    const reg =
      /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g;
    return reg.test(email);
  }

  async execute(data) {
    const { email, password } = data;

    if (!email) {
      throw new CustomError(CustomErrorEnum.MissingRequiredParameter, 'Request is missing email');
    }

    if (!password) {
      throw new CustomError(
        CustomErrorEnum.MissingRequiredParameter,
        'Request is missing password'
      );
    }

    if (!this.validateMail(email)) {
      throw new CustomError(CustomErrorEnum.InvalidParameter, 'Email is invalid');
    }

    const userPassword = this.userData.getUser(email);

    if (!userPassword) {
      throw new CustomError(CustomErrorEnum.MissingAuthorization, 'Cannot identify email');
    }

    if (password !== userPassword) {
      throw new CustomError(CustomErrorEnum.MissingAuthorization, 'Wrong password');
    }

    const payload = {
      email,
      currentTime: +Date.now()
    }

    const token = await jwt.sign(payload, process.env.AUTH_SECRET);

    return Promise.resolve(token);
  }
};
