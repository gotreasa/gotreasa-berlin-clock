import { YELLOW_LIGHT, RED_LIGHT, LIGHT_OFF } from './constants.js';

const getMinutes = (time) => parseInt(time.split(':')[1], 10);
const getRedLights = (numberOfLitLights, lights) => {
  const markedLights = lights.split('');

  const numberOfRedFifteenMinuteLights = Math.floor(numberOfLitLights / 3);
  for (let i = 0; i < numberOfRedFifteenMinuteLights; i += 1) {
    markedLights[i * 3 + 2] = RED_LIGHT;
  }

  return markedLights.join('');
};

export const getThirdRow = (time) => {
  const numberOfLitLights = Math.floor(getMinutes(time) / 5);

  let lights =
    YELLOW_LIGHT.repeat(numberOfLitLights) +
    LIGHT_OFF.repeat(11 - numberOfLitLights);

  lights = getRedLights(numberOfLitLights, lights);

  return lights;
};

export const getFourthRow = (time) => {
  const minutes = getMinutes(time);
  const numberOfYellowLights = minutes % 5;

  return (
    YELLOW_LIGHT.repeat(numberOfYellowLights) +
    LIGHT_OFF.repeat(4 - numberOfYellowLights)
  );
};
