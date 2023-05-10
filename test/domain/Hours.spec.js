const getFirstRow = require('../../src/domain/Hours');

describe('Retrieving the hours in the first row', () => {
  test.each`
    input         | expected
    ${'00:00:00'} | ${'OOOO'}
    ${'05:00:00'} | ${'ROOO'}
    ${'10:00:00'} | ${'RROO'}
    ${'15:00:00'} | ${'RRRO'}
    ${'20:00:00'} | ${'RRRR'}
    ${'04:00:00'} | ${'OOOO'}
    ${'06:00:00'} | ${'ROOO'}
  `(
    'should return $expected on the first row when the input is $input',
    ({ input, expected }) => {
      expect(getFirstRow(input)).toBe(expected);
    },
  );
});
