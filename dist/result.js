
// Importing the necessary functions from the modules
import { add } from "./modules/add.js";
import { subtract } from "./modules/subtract.js";
import { multiply } from "./modules/multiply.js";
import { divide } from "./modules/divide.js";
import { factorial } from "./modules/factorial.js";
import { square } from "./modules/square.js";

/**
 * A calculator that can perform basic arithmetic operations, calculate the factorial of a number, and calculate the square of a number.
 */
class Calculator {
  /**
   * Adds two numbers.
   * @param {number} num1 - The first number.
   * @param {number} num2 - The second number.
   * @returns {number} The sum of the two numbers.
   */
  add(num1, num2) {
    return add(num1, num2);
  }

  /**
   * Subtracts two numbers.
   * @param {number} num1 - The first number.
   * @param {number} num2 - The second number.
   * @returns {number} The difference between the two numbers.
   */
  subtract(num1, num2) {
    return subtract(num1, num2);
  }

  /**
   * Multiplies two numbers.
   * @param {number} num1 - The first number.
   * @param {number} num2 - The second number.
   * @returns {number} The product of the two numbers.
   */
  multiply(num1, num2) {
    return multiply(num1, num2);
  }

  /**
   * Divides two numbers.
   * @param {number} num1 - The first number.
   * @param {number} num2 - The second number.
   * @returns {number} The quotient of the two numbers.
   */
  divide(num1, num2) {
    return divide(num1, num2);
  }

  /**
   * Calculates the factorial of a number.
   * @param {number} num - The number.
   * @returns {number} The factorial of the number.
   */
  factorial(num) {
    return factorial(num);
  }

  /**
   * Calculates the square of a number.
   * @param {number} num - The number.
   * @returns {number} The square of the number.
   */
  square(num) {
    return square(num);
  }
}

// Example usage
const calculator = new Calculator();
console.log(calculator.add(5, 3)); // Output: 8
console.log(calculator.subtract(5, 3)); // Output: 2
console.log(calculator.multiply(5, 3)); // Output: 15
console.log(calculator.divide(6, 3)); // Output: 2
console.log(calculator.factorial(5)); // Output: 120
console.log(calculator.square(4)); // Output: 16
