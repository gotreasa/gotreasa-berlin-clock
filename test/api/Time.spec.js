const getTime = require('../../src/api/Time');

describe('Retrieve the time', () => {
  test('should return Y for the seconds when the seconds are even', () => {
    expect(getTime('00:00:00')).toMatchObject({ seconds: 'Y' });
  });
});
