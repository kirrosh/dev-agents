
import { add } from "./modules/add.js";
import { subtract } from "./modules/subtract.js";
import { multiply } from "./modules/multiply.js";
import { divide } from "./modules/divide.js";
import { factorial } from "./modules/factorial.js";
import { square } from "./modules/square.js";

function calculator(operation, num1, num2) {
  let result;
  
  switch (operation) {
    case "add":
      result = add(num1, num2);
      break;
    case "subtract":
      result = subtract(num1, num2);
      break;
    case "multiply":
      result = multiply(num1, num2);
      break;
    case "divide":
      result = divide(num1, num2);
      break;
    default:
      result = "Invalid operation";
  }
  
  return result;
}

function calculateFactorial(num) {
  return factorial(num);
}

function calculateSquare(num) {
  return square(num);
}
