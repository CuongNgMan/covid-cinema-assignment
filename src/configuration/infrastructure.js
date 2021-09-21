const { CinemaData } = require('../infrastructures/cinema-data-source');
const { UserData } = require('../infrastructures/user-data-source');

const defaultReserveSpace = [0, 0];
const CINEMA_ROW_SIZE = +process.env.CINEMA_ROW_SIZE || 10;
const CINEMA_COLUMN_SIZE = +process.env.CINEMA_COLUMN_SIZE || 10;
const CINEMA_DISTANCE_BETWEEN_SEAT = +process.env.CINEMA_DISTANCE_BETWEEN_SEAT || 1;
let CINEMA_FIRST_RESERVE_SPACE;

try {
  const envValue = process.env.CINEMA_FIRST_RESERVE_SPACE;

  if (!envValue) {
    CINEMA_FIRST_RESERVE_SPACE = defaultReserveSpace;
  } else {
    CINEMA_FIRST_RESERVE_SPACE = JSON.parse(process.env.CINEMA_FIRST_RESERVE_SPACE);
  }

  if (
    !CINEMA_FIRST_RESERVE_SPACE ||
    !Array.isArray(CINEMA_FIRST_RESERVE_SPACE) ||
    CINEMA_FIRST_RESERVE_SPACE.length === 0
  ) {
    CINEMA_FIRST_RESERVE_SPACE = defaultReserveSpace;
  }
} catch (error) {
  console.log('Error parsing first reserve space config. Set to default [0,0]');
  CINEMA_FIRST_RESERVE_SPACE = defaultReserveSpace;
}

module.exports.CinemaData = class extends CinemaData {
  constructor() {
    super(
      CINEMA_ROW_SIZE,
      CINEMA_COLUMN_SIZE,
      CINEMA_DISTANCE_BETWEEN_SEAT,
      CINEMA_FIRST_RESERVE_SPACE
    );
  }
};

module.exports.UserData = class extends UserData {
  constructor() {
    super();
  }
};
