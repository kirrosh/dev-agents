
import { addition } from "@/dist/units/addition.js";
import { subtraction } from "@/dist/units/subtraction.js";
import { multiplication } from "@/dist/units/multiplication.js";
import { division } from "@/dist/units/division.js";
import { factorial } from "@/dist/units/factorial.js";

/**
 * A calculator module that provides methods for performing basic arithmetic operations.
 */
export const calculator = {
  /**
   * Adds two numbers.
   * @param {number} a - The first number.
   * @param {number} b - The second number.
   * @returns {number} The sum of the two numbers.
   */
  add: addition,

  /**
   * Subtracts one number from another.
   * @param {number} a - The number to subtract from.
   * @param {number} b - The number to subtract.
   * @returns {number} The difference between the two numbers.
   */
  subtract: subtraction,

  /**
   * Multiplies two numbers.
   * @param {number} a - The first number.
   * @param {number} b - The second number.
   * @returns {number} The product of the two numbers.
   */
  multiply: multiplication,

  /**
   * Divides one number by another.
   * @param {number} a - The number to divide.
   * @param {number} b - The number to divide by.
   * @returns {number} The quotient of the division.
   */
  divide: division,

  /**
   * Calculates the factorial of a number.
   * @param {number} n - The number to calculate the factorial of.
   * @returns {number} The factorial of the number.
   */
  factorial: factorial,
};
