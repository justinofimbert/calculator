function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function division(a, b) {
  return a / b;
}

function product(a, b) {
  return a * b;
}

function operate(operator, a, b) {
  if (operator === "add") return add(a, b);
  else if (operator === "subtract") return subtract(a, b);
  else if (operator === "division") return division(a, b);
  else if (operator === "product") return product(a, b);
  return `operator: ${operator}, a: ${a}, b: ${b}`;
}