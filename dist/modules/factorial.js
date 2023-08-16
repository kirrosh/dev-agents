
/**
 * Adds two numbers.
 * @param {number} num1 - The first number.
 * @param {number} num2 - The second number.
 * @returns {number} The sum of the two numbers.
 */
export function add(num1, num2) {
  return num1 + num2;
}

/**
 * Subtracts two numbers.
 * @param {number} num1 - The first number.
 * @param {number} num2 - The second number.
 * @returns {number} The difference between the two numbers.
 */
export function subtract(num1, num2) {
  return num1 - num2;
}

/**
 * Multiplies two numbers.
 * @param {number} num1 - The first number.
 * @param {number} num2 - The second number.
 * @returns {number} The product of the two numbers.
 */
export function multiply(num1, num2) {
  return num1 * num2;
}

/**
 * Divides two numbers.
 * @param {number} num1 - The first number.
 * @param {number} num2 - The second number.
 * @returns {number} The quotient of the two numbers.
 */
export function divide(num1, num2) {
  return num1 / num2;
}

/**
 * Calculates the factorial of a number.
 * @param {number} num - The number.
 * @returns {number} The factorial of the number.
 */
export function factorial(num) {
  if (num === 0 || num === 1) {
    return 1;
  } else {
    return num * factorial(num - 1);
  }
}

/**
 * Calculates the square of a number.
 * @param {number} num - The number.
 * @returns {number} The square of the number.
 */
export function square(num) {
  return num * num;
}
