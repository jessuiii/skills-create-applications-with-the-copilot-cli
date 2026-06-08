#!/usr/bin/env node

/*
  Node.js CLI Calculator

  Supported operations:
  - add       : Addition (sum two or more numbers)
  - subtract  : Subtraction (subtract numbers in order)
  - multiply  : Multiplication (multiply two or more numbers)
  - divide    : Division (divide numbers in order) — division by zero handled
  - mod       : Modulo (remainder)
  - pow       : Exponentiation (power)
  - sqrt      : Square root (single argument)

  Usage examples:
    node src/calculator.js add 2 3         # 5
    node src/calculator.js subtract 10 4 1 # 5
    node src/calculator.js multiply 2 3 4  # 24
    node src/calculator.js divide 20 2 2   # 5

  If no arguments are provided, the script enters an interactive prompt.
*/

const readline = require('readline');

function parseNumbers(args) {
  const nums = args.map((s) => {
    const n = Number(s);
    if (Number.isNaN(n)) throw new Error(`Invalid number: ${s}`);
    return n;
  });
  return nums;
}

function calc(op, nums) {
  if (!Array.isArray(nums) || nums.length < 1) throw new Error('Need at least one number');

  switch (op) {
    case 'add':
      // addition: sum all numbers
      return nums.reduce((a, b) => a + b, 0);
    case 'subtract':
      // subtraction: subtract numbers in order (left-associative)
      return nums.slice(1).reduce((a, b) => a - b, nums[0]);
    case 'multiply':
      // multiplication: product of numbers
      return nums.reduce((a, b) => a * b, 1);
    case 'divide':
      // division: divide numbers in order; check division by zero
      return nums.slice(1).reduce((a, b) => {
        if (b === 0) throw new Error('Division by zero');
        return a / b;
      }, nums[0]);
    case 'mod':
      // modulo: remainder of divisions in order; check division by zero
      return nums.slice(1).reduce((a, b) => {
        if (b === 0) throw new Error('Division by zero in modulo');
        return modulo(a, b);
      }, nums[0]);
    case 'pow':
      // power: expect exactly two arguments: base and exponent
      if (nums.length !== 2) throw new Error('pow requires exactly two arguments: base and exponent');
      return power(nums[0], nums[1]);
    case 'sqrt':
      // square root: expect exactly one argument
      if (nums.length !== 1) throw new Error('sqrt requires exactly one argument');
      return squareRoot(nums[0]);
    default:
      throw new Error(`Unknown operation: ${op}`);
  }
}

// Additional math helpers
function modulo(a, b) {
  if (b === 0) throw new Error('Division by zero in modulo');
  return a % b;
}

function power(base, exponent) {
  return Math.pow(base, exponent);
}

function squareRoot(n) {
  if (n < 0) throw new Error('Cannot take square root of negative number');
  return Math.sqrt(n);
}

function printHelp() {
  console.log('Node.js CLI Calculator');
  console.log('Supported operations: add, subtract, multiply, divide, mod, pow, sqrt');
  console.log('Usage: node src/calculator.js <operation> <num1> <num2> [<num3> ...]');
  console.log('Example: node src/calculator.js add 2 3 4');
}

async function interactivePrompt() {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

  const question = (q) => new Promise((resolve) => rl.question(q, resolve));

  try {
    const op = (await question('Operation (add, subtract, multiply, divide): ')).trim();
    if (!op) {
      printHelp();
      rl.close();
      return;
    }

    const numsRaw = (await question('Numbers (space-separated): ')).trim();
    if (!numsRaw) {
      console.error('No numbers provided');
      rl.close();
      return;
    }

    const parts = numsRaw.split(/\s+/);
    const nums = parseNumbers(parts);
    const res = calc(op, nums);
    console.log('Result:', res);
  } catch (err) {
    console.error('Error:', err.message);
  } finally {
    rl.close();
  }
}

function main(argv) {
  const args = argv.slice(2);
  if (args.length === 0) {
    interactivePrompt();
    return;
  }

  const op = args[0];
  if (op === '-h' || op === '--help' || op === 'help') {
    printHelp();
    return;
  }

  const numArgs = args.slice(1);
  if (numArgs.length === 0) {
    console.error('No numbers provided.');
    printHelp();
    process.exitCode = 1;
    return;
  }

  try {
    const nums = parseNumbers(numArgs);
    const res = calc(op, nums);
    console.log(res);
  } catch (err) {
    console.error('Error:', err.message);
    process.exitCode = 1;
  }
}

module.exports = { parseNumbers, calc, modulo, power, squareRoot };

if (require.main === module) {
  main(process.argv);
}
