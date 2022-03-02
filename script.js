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

function operate(a, operator, b) {
  if (operator === "+") return add(a, b);
  else if (operator === "-") return subtract(a, b);
  else if (operator === "x") return product(a, b);
  else if (operator === "/") return division(a, b);
  return `a: ${a}, operator: ${operator}, b: ${b}`;
}

const currentNumber = document.querySelector("#current-number")
const previousNumberAndOperator = document.querySelector("#previous-number-and-operator")
const resultDisplay = document.querySelector("#result")

const numberButtons = Array.from(document.querySelectorAll(".number"));
const operatorButtons = Array.from(document.querySelectorAll("#operators button"))
const resultButton = document.querySelector("#operate")

numberButtons.forEach(number => number.addEventListener("click", () => {
  currentNumber.textContent = currentNumber.textContent + number.id;
}))

operatorButtons.forEach(operator => operator.addEventListener("click", () => {
  previousNumberAndOperator.textContent += `${currentNumber.textContent} ${operator.textContent} `;
  currentNumber.textContent = "";
}))

resultButton.addEventListener("click", () => {
  const numberAndOperator = previousNumberAndOperator.textContent.split(" ")
  currentNumber.textContent = operate(+numberAndOperator[0], numberAndOperator[1], +currentNumber.textContent)
  previousNumberAndOperator.textContent = ""
})