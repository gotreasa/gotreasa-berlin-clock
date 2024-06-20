import { YELLOW_LIGHT, LIGHT_OFF } from './constants.js';

export const getSeconds = (time) => {
  const seconds = parseInt(time.split(':')[2], 10);

  if (seconds % 2 === 1) {
    return YELLOW_LIGHT;
  }

  return LIGHT_OFF;
};
