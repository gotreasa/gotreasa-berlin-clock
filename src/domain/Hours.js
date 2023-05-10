const RED_LIGHT = 'R';
const LIGHT_OFF = 'O';
const getHours = (time) => parseInt(time.split(':')[0], 10);

const getFirstRow = (time) => {
  const hours = getHours(time);
  const numberOfRedLights = Math.floor(hours / 5);

  return (
    RED_LIGHT.repeat(numberOfRedLights) +
    LIGHT_OFF.repeat(4 - numberOfRedLights)
  );
};

const getSecondRow = (time) => {
  const hours = getHours(time);
  const singleHoursModuloFive = hours % 5;

  return (
    RED_LIGHT.repeat(singleHoursModuloFive) +
    LIGHT_OFF.repeat(4 - singleHoursModuloFive)
  );
};

module.exports = { getFirstRow, getSecondRow };
