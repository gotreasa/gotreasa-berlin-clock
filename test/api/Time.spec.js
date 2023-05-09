const getTime = require('../../src/api/Time');

describe('Retrieve the time', () => {
  test('should return Y for the seconds when the seconds are even', () => {
    expect(getTime('00:00:00')).toMatchObject({ seconds: 'Y' });
  });

  test.each([['0a:00:00'], ['blah'], ['99:99:99']])(
    'should return an error when the input is not a valid time (%s)',
    (input) => {
      expect(() => {
        getTime(input);
      }).toThrow('Your input should be in the format of HH:MM:ss');
    },
  );
});
