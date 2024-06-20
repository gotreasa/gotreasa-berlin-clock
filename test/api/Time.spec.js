import { getTime } from '../../src/api/Time';
import { LIGHT_OFF } from '../../src/domain/constants';

describe('Retrieve the time', () => {
  test('should return O for the seconds when the seconds are even', () => {
    expect(getTime('00:00:00')).toMatchObject({ seconds: LIGHT_OFF });
  });

  test.each([['0a:00:00'], ['blah'], ['99:99:99'], ['24:59:59']])(
    'should return an error when the input is not a valid time (%s)',
    (input) => {
      expect(() => {
        getTime(input);
      }).toThrow('Your input should be in the format of HH:MM:ss');
    },
  );
});
