const { getFourthRow, getThirdRow } = require('../../src/domain/Minutes');

describe('Handle the minutes', () => {
  test('should return OOOOOOOOOOO on the third row when the input is 00:00:00', () => {
    expect(getThirdRow('00:00:00')).toBe('OOOOOOOOOOO');
  });

  test.each`
    input         | expected
    ${'00:00:00'} | ${'OOOOOOOOOOO'}
    ${'00:05:00'} | ${'YOOOOOOOOOO'}
    ${'00:10:00'} | ${'YYOOOOOOOOO'}
    ${'00:15:00'} | ${'YYROOOOOOOO'}
    ${'00:20:00'} | ${'YYRYOOOOOOO'}
    ${'00:25:00'} | ${'YYRYYOOOOOO'}
    ${'00:30:00'} | ${'YYRYYROOOOO'}
    ${'00:35:00'} | ${'YYRYYRYOOOO'}
    ${'00:40:00'} | ${'YYRYYRYYOOO'}
    ${'00:45:00'} | ${'YYRYYRYYROO'}
    ${'00:50:00'} | ${'YYRYYRYYRYO'}
    ${'00:55:00'} | ${'YYRYYRYYRYY'}
  `(
    'should return $expected on the third row when the input is $input',
    ({ input, expected }) => {
      expect(getThirdRow(input)).toBe(expected);
    },
  );

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
