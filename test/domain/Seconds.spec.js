const getSeconds = require('../../src/domain/Seconds');

describe('Retrieving the seconds', () => {
  test('should return Y when an even value', () => {
    expect(getSeconds()).toBe('Y');
  });
});
