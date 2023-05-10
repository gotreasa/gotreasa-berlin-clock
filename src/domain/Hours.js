const getFirstRow = (time) => {
  const hours = parseInt(time.split(':')[0], 10);
  const multipleOfFive = Math.floor(hours / 5);

  return 'R'.repeat(multipleOfFive) + 'O'.repeat(4 - multipleOfFive);
};

module.exports = getFirstRow;
