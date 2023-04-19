const getTime = require('../../src/api/Time');

describe('Retrieve the current time', () => {
  test('should return Y for the seconds when the seconds are even', () => {
    expect(getTime()).toMatchObject({ seconds: 'Y' });
  });
});
