// @ts-nocheck
const { CinemaSeat } = require('../entities/cinema-seat');

let _cinemaData = null;

const generateCinemaData = (rLen = 10, cLen = 10, distance, firstReserveSpace = [0, 0]) => {
  const result = [];
  const [, restrictedSeatMap] = generateRestrictedSeatFrom(firstReserveSpace, distance, rLen, cLen);

  for (let i = 0; i < rLen; i++) {
    const currentRow = [];

    for (let j = 0; j < cLen; j++) {
      const data = new CinemaSeat({ row: i, column: j });
      const yFitPoints = restrictedSeatMap.get(i);

      if (yFitPoints && yFitPoints.includes(j)) {
        data.reserved = true;
      }

      currentRow.push(data);
    }

    result.push(currentRow);
  }

  return result;
};

const generateRestrictedSeatFrom = (point, distance, maxRow, maxColumn) => {
  const [x, y] = point;
  let expandPointFromX = [x];
  let expandPointFromY = [y];

  for (let i = distance; i > 0; i--) {
    const yTop = x - i;
    const yDown = x + i;
    const xLeft = y - i;
    const xRight = y + i;

    if (yTop >= 0) {
      expandPointFromX.push(yTop);
    }

    if (yDown < maxRow) {
      expandPointFromX.push(yDown);
    }

    if (xLeft >= 0) {
      expandPointFromY.push(xLeft);
    }

    if (xRight < maxColumn) {
      expandPointFromY.push(xRight);
    }
  }

  expandPointFromX = expandPointFromX.sort((a, b) => a - b);
  expandPointFromY = expandPointFromY.sort((a, b) => a - b);

  const result = [];
  const resultAsMap = new Map();

  for (let pX = 0; pX < expandPointFromX.length; pX++) {
    const v = Math.abs(expandPointFromX[pX] - x);
    const delta = Math.abs(v - distance);
    const yFitPoints = [];

    if (delta === 0) {
      yFitPoints.push(y);
    }

    if (delta !== 0) {
      for (let pY = 0; pY < expandPointFromY.length; pY++) {
        const v = Math.abs(expandPointFromY[pY] - y);

        if (v >= 0 && v <= delta) {
          yFitPoints.push(expandPointFromY[pY]);
        }
      }
    }

    yFitPoints.forEach((fitY) => {
      result.push([expandPointFromX[pX], fitY]);
    });

    resultAsMap.set(pX, yFitPoints);
  }

  return [result, resultAsMap];
};

module.exports.CinemaData = class {
  constructor(rows, columns, distance, firstReserveSpace) {
    this.rows = rows;
    this.columns = columns;
    this.distance = distance;
    this.firstReserveSpace = firstReserveSpace;

    if (!_cinemaData) {
      _cinemaData = generateCinemaData(rows, columns, distance, firstReserveSpace);
      this.cinemaData = _cinemaData;
    }
  }

  getRowLength() {
    return this.rows;
  }

  getColumnLength() {
    return this.columns;
  }

  getCinemaData() {
    return this.cinemaData;
  }

  getCinemaAsMap() {
    const map = new Map();

    for (let i = 0; i < this.rows; i++) {
      if (this.cinemaData[i]) {
        map.set(i, this.cinemaData[i]);
      } else {
        map.set(i, []);
      }
    }

    return map;
  }

  listCinema(options) {
    const { reserveStatus } = options;
    let count = 0;
    let result;

    if (typeof reserveStatus === 'boolean') {
      result = this.cinemaData.reduce((acc, curr) => {
        const filteredRow = curr.filter((i) => i.reserved === reserveStatus);
        if (filteredRow.length) {
          count += filteredRow.length;
          acc.push(filteredRow);
        }

        return acc;
      }, []);

      return [result, count];
    }

    count = this.rows * this.columns;
    result = this.cinemaData;

    return [result, count];
  }

  getCinemaTotalSeat() {
    return this.rows * this.columns;
  }

  resetCinema(firstReserveSpace) {
    _cinemaData = generateCinemaData(this.rows, this.columns, firstReserveSpace);
    this.firstReserveSpace = firstReserveSpace;
    this.cinemaData = _cinemaData;
  }

  reserveSeatAt(row, column) {
    this.cinemaData[row][column].reserved = true;

    const [restrictedSeat] = generateRestrictedSeatFrom(
      [row, column],
      this.distance,
      this.rows,
      this.columns
    );

    restrictedSeat.forEach((s) => {
      const [sRow, sCol] = s;
      if (!this.cinemaData[sRow][sCol].reserved) {
        this.cinemaData[sRow][sCol].reserved = true;
      }
    });
  }

  getAvailableSeat() {
    const flattedArray = this.cinemaData.flat();
    return flattedArray.filter((i) => !i.reserved);
  }

  findOneRowWithMaximumConsecutiveSeat(thresHold) {
    const BY_ONE_VALUE = 1;
    const mapRowToData = new Map();
    let rowIndex = 0;
    let totalSeat = 0;
    let seatIndex = [];

    if (thresHold >= this.rows) {
      thresHold = this.rows;
    }

    for (let i = 0; i < this.cinemaData.length; i++) {
      const currRow = this.cinemaData[i];
      const availableSeatIndex = [];
      let group = [];

      for (let j = 0; j < currRow.length; j++) {
        if (currRow[j].reserved) {
          continue;
        }

        availableSeatIndex.push(j);
      }

      if (availableSeatIndex && availableSeatIndex.length >= 2) {
        let prevIndex = 0;

        for (let k = 1; k < availableSeatIndex.length; k++) {
          if (availableSeatIndex[k] !== availableSeatIndex[k - 1] + BY_ONE_VALUE) {
            group.push(availableSeatIndex.slice(prevIndex, k));
            prevIndex = k;
          }
        }

        group.push(availableSeatIndex.slice(prevIndex, availableSeatIndex.length));
      }

      // if (group.length === 1) {
      //   const seatIndex = group[0];
      //   result.set(i, { totalSeat: seatIndex.length, index: seatIndex });
      // }

      // if (group.length > 1) {
      //   group = group.sort((a, b) => b.length - a.length);
      //   const maxSeatIndex = group[0];
      //   result.set(i, { totalSeat: maxSeatIndex.length, index: maxSeatIndex });
      // }

      group = group.sort((a, b) => b.length - a.length);
      const maxSeatIndex = group[0];

      if (maxSeatIndex && maxSeatIndex.length) {
        if (maxSeatIndex.length >= thresHold) {
          rowIndex = i;
          seatIndex = maxSeatIndex;
          totalSeat = maxSeatIndex.length;

          return {
            row: rowIndex,
            totalSeat,
            seatIndex,
          };
        }

        if (maxSeatIndex.length > seatIndex.length) {
          rowIndex = i;
          seatIndex = maxSeatIndex;
          totalSeat = maxSeatIndex.length;
        }
      }
    }

    return {
      row: rowIndex,
      totalSeat,
      seatIndex,
    };
  }
};
