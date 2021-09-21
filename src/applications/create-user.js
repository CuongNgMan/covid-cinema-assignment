const { CustomError } = require('../common/custom-error');
const { CustomErrorEnum } = require('../common/custom-error-enum');

module.exports.CreateUser = class {
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

    if(Array.from(password).length < 9) {
      throw new CustomError(CustomErrorEnum.InvalidParameter, 'Password must be at least 9 character');
    }

    if (!this.validateMail(email)) {
      throw new CustomError(CustomErrorEnum.InvalidParameter, 'Email is invalid');
    }

    this.userData.createUser(email, password);

    return Promise.resolve([true, "User created"]);
  }
};
