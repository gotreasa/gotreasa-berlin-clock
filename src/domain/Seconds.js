const getSeconds = (time) => {
  const seconds = parseInt(time.split(':')[2], 10);

  if (seconds % 2 === 1) {
    return 'O';
  }

  return 'Y';
};
module.exports = getSeconds;
