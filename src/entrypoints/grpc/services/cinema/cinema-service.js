// @ts-nocheck
const path = require('path');

const { loadProto } = require('../../../common/load-proto');
const { listCinemaSeat } = require('./handlers/list-cinema-handler');
const { reserveCinemaSeatHandler } = require('./handlers/reserve-cinema-seat-handler');
const { getAvailableCinemaSeat } = require('./handlers/get-available-cinema-seat-handler');
const { reserveSeatByPosition } = require('./handlers/reserve-seat-by-position-handler');
const { createUserHandler } = require('./handlers/create-user-handler');
const { loginHandler } = require('./handlers/login-handler');

const cinemaProtoFile = path.join(__dirname, '../../../..', 'protos/cinema.proto');

const proto = loadProto(cinemaProtoFile);

const { service } = proto.cinema.CinemaSeatAllocation;

module.exports.entityService = {
  service,
  handlers: {
    ListCinemaSeat: listCinemaSeat,
    ReserveSeat: reserveCinemaSeatHandler,
    GetAvailableCinemaSeat: getAvailableCinemaSeat,
    ReserveSeatByPotision: reserveSeatByPosition,
    CreateUser: createUserHandler,
    Login: loginHandler,
  },
};
