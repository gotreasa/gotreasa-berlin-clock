const { getFourthRow } = require('../../src/domain/Minutes');

describe('Handle the minutes', () => {
  test.each`
    input         | expected
    ${'00:00:00'} | ${'OOOO'}
    ${'00:01:00'} | ${'YOOO'}
    ${'00:02:00'} | ${'YYOO'}
    ${'00:08:00'} | ${'YYYO'}
    ${'00:14:00'} | ${'YYYY'}
    ${'00:19:00'} | ${'YYYY'}
    ${'00:21:00'} | ${'YOOO'}
  `(
    'should return $expected on the fourth row when the input is $input',
    ({ input, expected }) => {
      expect(getFourthRow(input)).toBe(expected);
    },
  );
});
