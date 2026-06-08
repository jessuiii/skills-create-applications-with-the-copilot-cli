const { calc, parseNumbers } = require('../calculator');

describe('Calculator operations', () => {
  test('addition: add 2 + 3 = 5', () => {
    expect(calc('add', parseNumbers(['2', '3']))).toBe(5);
  });

  test('subtraction: 10 - 4 = 6', () => {
    expect(calc('subtract', parseNumbers(['10', '4']))).toBe(6);
  });

  test('multiplication: 45 * 2 = 90', () => {
    expect(calc('multiply', parseNumbers(['45', '2']))).toBe(90);
  });

  test('division: 20 / 5 = 4', () => {
    expect(calc('divide', parseNumbers(['20', '5']))).toBe(4);
  });

  test('addition with many numbers', () => {
    expect(calc('add', parseNumbers(['1', '2', '3', '4']))).toBe(10);
  });

  test('multiplication with zero', () => {
    expect(calc('multiply', parseNumbers(['0', '5', '7']))).toBe(0);
  });

  test('subtraction order matters', () => {
    expect(calc('subtract', parseNumbers(['10', '3', '2']))).toBe(5); // 10-3-2
  });

  test('division by zero throws', () => {
    expect(() => calc('divide', parseNumbers(['10', '0']))).toThrow('Division by zero');
  });

  test('invalid number in parseNumbers throws', () => {
    expect(() => parseNumbers(['2', 'foo'])).toThrow('Invalid number: foo');
  });

  test('unknown operation throws', () => {
    expect(() => calc('pow', parseNumbers(['2', '3']))).toThrow('Unknown operation: pow');
  });

  test('need at least one number', () => {
    expect(() => calc('add', [])).toThrow('Need at least one number');
  });
});
