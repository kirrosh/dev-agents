
/**
 * Divides two numbers.
 * @param {number} num1 - The first number.
 * @param {number} num2 - The second number.
 * @returns {number} The quotient of the two numbers.
 */
export function divide(num1, num2) {
  if (num2 === 0) {
    throw new Error("Cannot divide by zero");
  }
  return num1 / num2;
}
