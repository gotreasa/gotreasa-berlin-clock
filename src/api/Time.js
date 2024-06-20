import { getFirstRow, getSecondRow } from '../domain/Hours.js';
import { getFourthRow, getThirdRow } from '../domain/Minutes.js';
import { getSeconds } from '../domain/Seconds.js';

export const getTime = (time) => {
  if (!/^([0-1]\d|2[0-3]):[0-5]\d:[0-5]\d$/.test(time)) {
    throw Error('Your input should be in the format of HH:MM:ss');
  }

  return {
    seconds: getSeconds(time),
    firstRow: getFirstRow(time),
    secondRow: getSecondRow(time),
    thirdRow: getThirdRow(time),
    fourthRow: getFourthRow(time),
  };
};
