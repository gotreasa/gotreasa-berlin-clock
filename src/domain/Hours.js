import { RED_LIGHT, LIGHT_OFF } from './constants.js';

const getHours = (time) => parseInt(time.split(':')[0], 10);

export const getFirstRow = (time) => {
  const hours = getHours(time);
  const numberOfRedLights = Math.floor(hours / 5);

  return (
    RED_LIGHT.repeat(numberOfRedLights) +
    LIGHT_OFF.repeat(4 - numberOfRedLights)
  );
};

export const getSecondRow = (time) => {
  const hours = getHours(time);
  const singleHoursModuloFive = hours % 5;

  return (
    RED_LIGHT.repeat(singleHoursModuloFive) +
    LIGHT_OFF.repeat(4 - singleHoursModuloFive)
  );
};
