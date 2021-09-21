const { Login } = require('../../../../../configuration/application');
const { errorHelper } = require("../../../../../common/error-helper")

module.exports.loginHandler = async function loginHandler(call, callback) {
  // const nodeId = call.request.node_id;
  // const metadata = { traceContext: call.metadata.get("x-request-id")[0] };

  try {
    const { email, password } = call.request;

    const interactor = new Login();

    const token = await interactor.execute({ email, password });

    return callback(null, { token });
  } catch (error) {
    console.error(`Error handling loginHandler ${JSON.stringify(error.stack)}`);
    return callback(errorHelper(error), null);
  }
};
