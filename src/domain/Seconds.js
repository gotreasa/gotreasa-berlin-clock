const { YELLOW_LIGHT, LIGHT_OFF } = require('./constants');

const getSeconds = (time) => {
  const seconds = parseInt(time.split(':')[2], 10);

  if (seconds % 2 === 1) {
    return LIGHT_OFF;
  }

  return YELLOW_LIGHT;
};
module.exports = getSeconds;
