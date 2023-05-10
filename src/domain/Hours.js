const getFirstRow = (time) => {
  const RED_LIGHT = 'R';
  const LIGHT_OFF = 'O';

  const hours = parseInt(time.split(':')[0], 10);
  const numberOfRedLights = Math.floor(hours / 5);

  return (
    RED_LIGHT.repeat(numberOfRedLights) +
    LIGHT_OFF.repeat(4 - numberOfRedLights)
  );
};

module.exports = getFirstRow;
