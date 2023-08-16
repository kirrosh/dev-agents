
/**
 * Calculates the factorial of a number.
 * @param {number} n - The number to calculate the factorial of.
 * @returns {number} - The factorial of the given number.
 */
export const factorial = (n) => {
  if (n === 0 || n === 1) {
    return 1;
  } else {
    return n * factorial(n - 1);
  }
};
