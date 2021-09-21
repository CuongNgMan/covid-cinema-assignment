class CinemaSeat {
  constructor(data) {
    this.row = data.row;
    this.column = data.column;
    this.reserved = false;
  }
}

module.exports.CinemaSeat = CinemaSeat;
