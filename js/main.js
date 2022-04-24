class Calculator {
  constructor(displayPreviousTextElement, displayCurrentTextElement) {
    this.displayPreviousTextElement = displayPreviousTextElement;
    this.displayCurrentTextElement = displayCurrentTextElement;
    this.clear();
  }

  clear() {
    this.currentOperand = "";
    this.previousOperand = "";
    this.operation = undefined;
  }
  delete() {
    this.currentOperand = this.currentOperand.toString().slice(0, -1);
  }
  appendNumber(number) {
    if (number === "." && this.currentOperand.includes(".")) return;
    this.currentOperand = this.currentOperand.toString() + number.toString();
  }
  chooseOperation(operation) {
    if (this.currentOperand === "") return;
    if (this.previousOperand !== "") {
      this.compute();
    }
    this.operation = operation;
    this.previousOperand = this.currentOperand;
    this.currentOperand = "";
  }
  compute() {
    const previousNum = parseFloat(this.previousOperand);
    const currentNum = parseFloat(this.currentOperand);
    let result;
    if (isNaN(previousNum) || isNaN(currentNum)) return;

    switch (this.operation) {
      case "+":
        result = previousNum + currentNum;
        break;
      case "-":
        result = previousNum - currentNum;
        break;
      case "/":
        result = previousNum / currentNum;
        break;
      case "*":
        result = previousNum * currentNum;
        break;
      default:
        return;
    }
    this.currentOperand = result;
    this.operation = undefined;
    this.previousOperand = "";
  }

  getDisplayNumber(number) {
    const stringNumber = number.toString();
    const integerNumber = parseFloat(stringNumber.split(".")[0]);
    const decimalNumber = stringNumber.split(".")[1];

    let displayedNumber;
    if (isNaN(integerNumber)) {
      displayedNumber = "";
    } else {
      displayedNumber = integerNumber.toLocaleString("en", {
        maximumFractionDigits: 0,
      });
    }

    if (decimalNumber != null) {
      return `${displayedNumber}.${decimalNumber}`;
    } else {
      return displayedNumber;
    }
  }
  update() {
    this.displayCurrentTextElement.innerText = this.getDisplayNumber(
      this.currentOperand
    );

    if (this.operation != null) {
      this.displayPreviousTextElement.innerText = `${this.getDisplayNumber(
        this.previousOperand
      )} ${this.operation}`;
    } else {
      this.displayPreviousTextElement.innerText = "";
    }
  }
}

const numberButtons = document.querySelectorAll("[data-number]");
const operationButtons = document.querySelectorAll("[data-operation]");
const equalsButton = document.querySelector("[data-equals]");
const deleteButton = document.querySelector("[data-delete]");
const clearAllButton = document.querySelector("[data-clear-all]");
const displayPreviousTextElement = document.querySelector(
  "[data-display-prev]"
);
const displayCurrentTextElement = document.querySelector("[data-display-cur]");

const calculator = new Calculator(
  displayPreviousTextElement,
  displayCurrentTextElement
);
numberButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    calculator.appendNumber(btn.innerText);
    calculator.update();
  });
});
operationButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    calculator.chooseOperation(btn.innerText);
    calculator.update();
  });
});

deleteButton.addEventListener("click", () => {
  calculator.delete();
  calculator.update();
});

clearAllButton.addEventListener("click", () => {
  calculator.clear();
  calculator.update();
});

equalsButton.addEventListener("click", () => {
  calculator.compute();
  calculator.update();
});

console.log("gonz");
console.log("raheem");

console.log();
