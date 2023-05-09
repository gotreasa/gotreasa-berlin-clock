const getSeconds = require('../domain/Seconds');

const getTime = (time) => {
  return { seconds: getSeconds(time) };
};

module.exports = getTime;
