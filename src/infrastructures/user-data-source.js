const userData = new Map();

module.exports.UserData = class {
  createUser(email, password) {
    if (!userData.has(email)) {
      userData.set(email, password);
    }

    return userData.get(email);
  }

  getUser(email) {
    return userData.get(email);
  }
};
