module.exports.CustomError = class extends Error {
  constructor(customErrorEnum, message, error) {
    super(message);
    this.code = customErrorEnum.errorCode;

    if (error && error.stack) {
      let trace = "";
      trace += this.stack.split("\n")[0];
      trace += `\n${this.stack.split("\n")[1]}`;
      trace += `\n${error.stack}`;
      this.stack = trace;
    }
  }
};