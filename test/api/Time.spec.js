const MockDate = require('mockdate');
const getTime = require('../../src/api/Time');

describe('Retrieve the current time', () => {
  test('should return Y for the seconds when the seconds are even', () => {
    MockDate.set('2021-02-26T00:00:00.652Z');
    expect(getTime()).toMatchObject({ seconds: 'Y' });
  });
});
