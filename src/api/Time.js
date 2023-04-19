const getSeconds = require('../domain/Seconds');

const getTime = () => {
  return { seconds: getSeconds() };
};

module.exports = getTime;
