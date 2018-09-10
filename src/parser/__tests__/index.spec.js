const parse = require('../index').parse;

test('12.34', () => {
  expect(parse('12.34')).toEqual([12.34]);
});

test('12.34 + 5% - 6.7% * 89 / 0.1%', () => {
  expect(parse('12.3 + 4% - 5.6% * 78 / 9.0%')).toEqual([12.3, '+', 0.04, '-', 0.056, '*', 78, '/', 0.09]);
});