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

  test('need at least one number', () => {
    expect(() => calc('add', [])).toThrow('Need at least one number');
  });

  // New tests for extended operations
  test('modulo: 10 mod 3 = 1', () => {
    expect(calc('mod', parseNumbers(['10', '3']))).toBe(1);
  });

  test('modulo with negative dividend: -5 mod 2 = -1', () => {
    expect(calc('mod', parseNumbers(['-5', '2']))).toBe(-1);
  });

  test('modulo division by zero throws', () => {
    expect(() => calc('mod', parseNumbers(['10', '0']))).toThrow('Division by zero in modulo');
  });

  test('power: 2^8 = 256', () => {
    expect(calc('pow', parseNumbers(['2', '8']))).toBe(256);
  });

  test('power with fractional exponent: 9^(1/2) = 3', () => {
    expect(calc('pow', parseNumbers(['9', '0.5']))).toBeCloseTo(3);
  });

  test('pow requires exactly two args', () => {
    expect(() => calc('pow', parseNumbers(['2']))).toThrow('pow requires exactly two arguments');
    expect(() => calc('pow', parseNumbers(['2','3','4']))).toThrow('pow requires exactly two arguments');
  });

  test('square root: sqrt 16 = 4', () => {
    expect(calc('sqrt', parseNumbers(['16']))).toBe(4);
  });

  test('square root of non-perfect square', () => {
    expect(calc('sqrt', parseNumbers(['2']))).toBeCloseTo(Math.sqrt(2));
  });

  test('square root of negative number throws', () => {
    expect(() => calc('sqrt', parseNumbers(['-4']))).toThrow('Cannot take square root of negative number');
  });
});
