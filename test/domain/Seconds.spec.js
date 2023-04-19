const MockDate = require('mockdate');
const getSeconds = require('../../src/domain/Seconds');

describe('Retrieving the seconds', () => {
  afterEach(() => {
    MockDate.reset();
  });

  test('should return Y when an even value', () => {
    MockDate.set('2021-02-26T00:00:00.652Z');
    expect(getSeconds()).toBe('Y');
  });

  test.each([['00:00:01'], ['00:00:11'], ['12:11:57']])(
    'should return O when an odd value (%s)',
    (time) => {
      MockDate.set(`2021-02-26T${time}.652Z`);
      expect(getSeconds()).toBe('O');
    },
  );
});
