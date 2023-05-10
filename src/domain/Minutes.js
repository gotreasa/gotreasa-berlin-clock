const YELLOW_LIGHT = 'Y';
const LIGHT_OFF = 'O';

const getMinutes = (time) => parseInt(time.split(':')[1], 10);

const getFourthRow = (time) => {
  const minutes = getMinutes(time);
  const numberOfYellowLights = minutes % 5;

  return (
    YELLOW_LIGHT.repeat(numberOfYellowLights) +
    LIGHT_OFF.repeat(4 - numberOfYellowLights)
  );
};

module.exports = {
  getFourthRow,
};
