import { getFirstRow, getSecondRow } from '../../src/domain/Hours';

describe('Retrieving the hours', () => {
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

  test.each`
    input         | expected
    ${'00:00:00'} | ${'OOOO'}
    ${'01:00:00'} | ${'ROOO'}
    ${'02:00:00'} | ${'RROO'}
    ${'08:00:00'} | ${'RRRO'}
    ${'14:00:00'} | ${'RRRR'}
    ${'19:00:00'} | ${'RRRR'}
    ${'21:00:00'} | ${'ROOO'}
  `(
    'should return $expected on the second row when the input is $input',
    ({ input, expected }) => {
      expect(getSecondRow(input)).toBe(expected);
    },
  );
});
