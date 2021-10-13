let operator = "";
let operand1 = "";
let operand2 = "";

// SELECTORS
const operandButtons = document.querySelectorAll(".operand");
const operatorButtons = document.querySelectorAll(".operator");
const equalsButton = document.querySelector(".equals");
const dotButton = document.querySelector(".dot");
const clearButton = document.querySelector(".clear");
const backspaceButton = document.querySelector(".backspace");

const displayContent = document.querySelector(".content");


// EVENT LISTENERS
operandButtons.forEach(btn => btn.addEventListener("click", () => appendNumber(btn.textContent)))
operatorButtons.forEach(btn => btn.addEventListener("click", () => setOperator(btn.textContent)))
equalsButton.addEventListener("click", () => evaluateResult())
clearButton.addEventListener("click", () => clear())
backspaceButton.addEventListener("click", () => backspace())
dotButton.addEventListener("click", () => appendDot())

// STYLE EVENT LISTENERS
const allButtons = document.querySelectorAll('button');
allButtons.forEach(btn => btn.addEventListener('click', (e) => updateStyle(e)));
allButtons.forEach(btn => btn.addEventListener("transitionend", (e) => deleteStyle(e)))

function updateStyle(e) {
    if (e.target.classList.contains('func-button')) {
        e.target.classList.add("func-button-clicked")
    } else {
        e.target.classList.add("clicked");
    }
}

function deleteStyle(e) {
    e.target.classList.remove("clicked");
    e.target.classList.remove("func-button-clicked");
}

// KEYBOARD LISTENERS * * * * * * 
window.addEventListener("keydown", handleKeyboardInput);

function handleKeyboardInput(e) {
    if (e.key.match(/[-/*+]/)) {
        if (e.key === "*") {
            setOperator("x")
        } else {
            setOperator(e.key)
        }
    }
    if (e.key.match(/\d/)) appendNumber(e.key);
    if (e.key === "=" || e.key === "Enter") evaluateResult();
    if (e.key === ".") appendDot();
    if (e.key === "Backspace") backspace();
    if (e.key === "c" || e.key === "C") clear()
}

// EVENT FUNCTIONS
function appendNumber(number) {
    if (displayContent.textContent.length < 12) {
        displayContent.textContent += number;
    }
}

function setOperator(newOperator) {
    if (!operator) {
        operator = newOperator;
        displayContent.textContent += newOperator;
    }
}

function evaluateResult() {
    const [oper1, oper2] = displayContent.textContent.split(/[-+/x]/)
    operand1 = oper1;
    operand2 = oper2;

    let resultOfOperation = operate(operator, operand1, operand2);
    let resultOfOperationToString = resultOfOperation.toString();

    if (resultOfOperationToString.length > 10) {
        let difference = resultOfOperationToString.length - 10;
        resultOfOperationToString = resultOfOperationToString.substring(0, resultOfOperationToString.length - difference);
        displayContent.textContent = resultOfOperationToString + `tr`;
        alert("tr - means truncated. Result couldn't fit on the screen so it was truncated")
    } else {
        displayContent.textContent = resultOfOperationToString;
    }

    operand1 = "";
    operand2 = "";
    operator = "";
}

function clear() {
    operand1 = "";
    operand2 = "";
    operator = "";
    displayContent.textContent = "";
}

function backspace() {
    let text = displayContent.textContent;
    displayContent.textContent = text.substring(0, text.length - 1);
    if (text[text.length - 1].match(/[+-/x]/)) {
        operator = "";
    }
}

function appendDot() {
    if (!displayContent.textContent.includes(".")) {
        if (displayContent.textContent.match(/.*[-+x/]$/)) {
            displayContent.textContent += "0."
        } else {
            displayContent.textContent += ".";
        }
    }
}

// BASIC FUNCTIONS
function add(a, b) {
    return Number(a) + Number(b);
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    // return Math.floor((a * b) * 100) / 100;
    return a * b;
}

function divide(a, b) {
    // return Math.floor((a / b) * 100) / 100;
    return a / b;
}

function operate(operator, a, b) {
    switch (operator) {
        case "+":
            return add(a, b);
        case "-":
            return subtract(a, b);
        case "x":
            return multiply(a, b);
        case "/":
            return divide(a, b);
    }
}