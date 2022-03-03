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

function roundToTwo (number) {
  return +(Math.round(number + "e+2") + "e-2");
}

function operate(a, operator, b) {
  if (operator === "+") return roundToTwo(add(a, b));
  else if (operator === "-") return roundToTwo(subtract(a, b));
  else if (operator === "x") return roundToTwo(product(a, b));
  else if (operator === "/") return roundToTwo(division(a, b));
  return `a: ${a}, operator: ${operator}, b: ${b}`;
}

function callOperate() {
  if (previousNumberAndOperator.textContent === "") return;
  // this function calls operate() on currentNumber and previousNumberAndOperator and cleans pN&O
  const numberAndOperator = previousNumberAndOperator.textContent.split(" ");
  currentNumber.textContent = operate(+numberAndOperator[0], numberAndOperator[1], +currentNumber.textContent);
  previousNumberAndOperator.textContent = "";
}

// display parts
const currentNumber = document.querySelector("#current-number");
const previousNumberAndOperator = document.querySelector("#previous-number-and-operator");

// buttons
const numberButtons = Array.from(document.querySelectorAll(".number"));
const operatorButtons = Array.from(document.querySelectorAll("#operators button"));
const resultButton = document.querySelector("#operate");
const clearButton = document.querySelector("#delete");

// each time you click a number, the number will be concatenated to the currentNumber div
numberButtons.forEach(number => number.addEventListener("click", () => {
  currentNumber.textContent = currentNumber.textContent + number.id;
}))

operatorButtons.forEach(operator => operator.addEventListener("click", () => {
  // if an operator is clicked when we have both numeric and operator variables available
  // then callOperate over those variables
  if (previousNumberAndOperator.textContent !== "") callOperate();

  // currentNumber + operator are sent to previousNumberAndOperator text content
  previousNumberAndOperator.textContent += `${currentNumber.textContent} ${operator.textContent} `;

  currentNumber.textContent = "";
}))

resultButton.addEventListener("click", callOperate);

clearButton.addEventListener("click", () => {
  currentNumber.textContent = "";
  previousNumberAndOperator.textContent = ""; 
})