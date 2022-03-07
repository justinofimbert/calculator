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

function pressButton(e) {
  const keyPressed = e.key.toLowerCase();
  const buttonPressed = document.querySelector(`button[data-key="${keyPressed}"]`);
  if (buttonPressed === null) return;

  if (buttonPressed.classList.contains("number")) {
    const number = buttonPressed.textContent;
    typeNumber(number);
    return;
  }

  if (buttonPressed.classList.contains("operator")) {
    if (previousNumberAndOperator.textContent !== "") callOperate();

    const operator = buttonPressed.textContent;
    passToNextField(operator);
    return;
  }

  if (buttonPressed.id.includes("clear")) {
    clearDisplay();
    return;
  }

  if (buttonPressed.id.includes("backspace")) {
    deleteLastNumber();
    return;
  }

  if (buttonPressed.id.includes("result")) {
    callOperate();
    return;
  }
}

function typeNumber(number) {
  currentNumber.textContent = currentNumber.textContent + number;
}

function passToNextField(operator) {
  previousNumberAndOperator.textContent += `${currentNumber.textContent} ${operator} `;

  currentNumber.textContent = "";
}

function clearDisplay() {
  currentNumber.textContent = "";
  previousNumberAndOperator.textContent = ""; 
}

function deleteLastNumber() {
  currentNumber.textContent = currentNumber.textContent.slice(0, -1);
}

// display parts
const currentNumber = document.querySelector("#current-number");
const previousNumberAndOperator = document.querySelector("#previous-number-and-operator");

// buttons
const allButtons = Array.from(document.querySelectorAll("button"));
const numberButtons = Array.from(document.querySelectorAll(".number"));
const operatorButtons = Array.from(document.querySelectorAll(".operator"));
const clearButton = document.querySelector("#clear");
const backspaceButton = document.querySelector("#backspace")
const resultButton = document.querySelector("#result");

// each time you click a number, the number will be concatenated to the currentNumber div
numberButtons.forEach(button => button.addEventListener("click", () => {
  const number = button.textContent;
  typeNumber(number);
  // currentNumber.textContent = currentNumber.textContent + number;
}))

operatorButtons.forEach(button => button.addEventListener("click", () => {
  // if an operator is clicked when we have both numeric and operator variables available
  // then callOperate over those variables
  if (previousNumberAndOperator.textContent !== "") callOperate();

  const operator = button.textContent;
  passToNextField(operator);
}))

clearButton.addEventListener("click", clearDisplay);

backspaceButton.addEventListener("click", deleteLastNumber)

resultButton.addEventListener("click", callOperate);

window.addEventListener("keydown", pressButton)

allButtons.forEach(button => button.addEventListener("mouseenter", () => button.classList.add("hovering")))
allButtons.forEach(button => button.addEventListener("mouseleave", () => button.classList.remove("hovering")))

allButtons.forEach(button => button.addEventListener("click", () => button.classList.add("press")))
allButtons.forEach(button => button.addEventListener("transitionend", () => button.classList.remove("press")))