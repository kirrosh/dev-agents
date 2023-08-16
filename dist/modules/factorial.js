
/**
 * Calculates the factorial of a number.
 * @param {number} num - The number.
 * @returns {number} The factorial of the number.
 */
function factorial(num) {
  if (num === 0 || num === 1) {
    return 1;
  } else {
    return num * factorial(num - 1);
  }
}

export { factorial };
