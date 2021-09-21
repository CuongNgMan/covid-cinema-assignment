const { CreateUser } = require('../../../../../configuration/application');
const { errorHelper } = require('../../../../../common/error-helper');

module.exports.createUserHandler = async function createUserHandler(call, callback) {
  try {
    const { email, password } = call.request;

    const interactor = new CreateUser();

    const [status, message] = await interactor.execute({ email, password });

    return callback(null, { status, message });
  } catch (error) {
    console.error(`Error handling createUserHandler ${JSON.stringify(error.stack)}`);
    return callback(errorHelper(error), null);
  }
};
