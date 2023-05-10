const { getFirstRow, getSecondRow } = require('../domain/Hours');
const getSeconds = require('../domain/Seconds');

const getTime = (time) => {
  if (!/^[0-2][0-9]:[0-5][0-9]:[0-5][0-9]$/.test(time)) {
    throw Error('Your input should be in the format of HH:MM:ss');
  }

  return {
    seconds: getSeconds(time),
    firstRow: getFirstRow(time),
    secondRow: getSecondRow(time),
  };
};

module.exports = getTime;
