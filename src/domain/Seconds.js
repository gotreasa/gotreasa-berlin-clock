const getSeconds = () => {
  const currentTime = new Date();

  if (currentTime.getSeconds() % 2 === 1) {
    return 'O';
  }

  return 'Y';
};
module.exports = getSeconds;
