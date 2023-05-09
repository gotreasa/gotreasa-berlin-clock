const getSeconds = require('../../src/domain/Seconds');

describe('Retrieving the seconds', () => {
  test('should return Y when an even value', () => {
    expect(getSeconds('00:00:00')).toBe('Y');
  });

  test.each([['00:00:01'], ['00:00:11'], ['12:11:57']])(
    'should return O when an odd value (%s)',
    (time) => {
      expect(getSeconds(time)).toBe('O');
    },
  );
});
