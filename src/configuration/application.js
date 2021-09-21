const { CinemaData, UserData } = require('./infrastructure');

const { GetAvailableCinemaSeat } = require('../applications/get-available-cinema-seat');
const { ReserveSeatByPosition } = require('../applications/reserve-seat-by-position');
const { ReserveCinemaSeat } = require('../applications/reserve-cinema-seat');
const { ListCinemaSeat } = require('../applications/list-cinema-seat');
const { CreateUser } = require('../applications/create-user.js');
const { Login } = require('../applications/login.js');


const infraData = new CinemaData();
const userData = new UserData();

module.exports.GetAvailableCinemaSeat = class extends GetAvailableCinemaSeat {
  constructor() {
    super({
      infra: {
        data: infraData,
        userData,
      },
    });
  }
};

module.exports.ReserveCinemaSeat = class extends ReserveCinemaSeat {
  constructor() {
    super({
      infra: {
        data: infraData,
        userData
      },
    });
  }
};

module.exports.ListCinemaSeat = class extends ListCinemaSeat {
  constructor() {
    super({
      infra: {
        data: infraData,
        userData
      },
    });
  }
};

module.exports.ReserveSeatByPosition = class extends ReserveSeatByPosition {
  constructor() {
    super({
      infra: {
        data: infraData,
        userData
      },
    });
  }
};

module.exports.CreateUser = class extends CreateUser {
  constructor() {
    super({
      infra: {
        data: infraData,
        userData
      },
    });
  }
};

module.exports.Login = class extends Login {
  constructor() {
    super({
      infra: {
        data: infraData,
        userData
      },
    });
  }
};
