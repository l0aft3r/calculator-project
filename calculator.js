let num1 = null;
let num2 = 0;
let operator = null;

const btns = Array.from(document.querySelectorAll(".btn"));
const display = document.querySelector("#display-text");

function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}

function precentage(a) {
    return a / 100;
}

function operate(a, b, operator) {
    a = Number(a);
    b = Number(b);
    if (operator === "+") {
        a = add(a, b);
    } else if (operator === "-") {
        a = subtract(a, b);
    } else if (operator === "*") {
        a = multiply(a, b);
    } else if (operator === "/") {
        a = divide(a, b);
    } else if (operator === "%") {
        a = precentage(a)
    }
    if (String(a).length > 5) {
        return Number(String(a).slice(0, 9));
    } else {
        return a;
    }
}

function setDisplayText(str) {
    display.textContent = str;
}

function updateDisplay(input) {
    if (isNaN(display.textContent) || display.textContent === '0') {
        display.textContent = '';
    }

    if (!(isNaN(input))) {
        if (num2 === null) {
            setDisplayText('')
        }
        display.textContent += input;
        num2 = display.textContent;
    } else {
        if (!(input === 'c') && !(input === 'equals') && !(input === '.') && !(input === '←') && !(input === '%')) {
            if (num1 === null || operator === null) {
                num1 = display.textContent;
                operator = input;
                setDisplayText('0');
            } else {
                num2 = display.textContent;
                num1 = operate(num1, num2, operator);
                num2 = null;
                operator = input;
                setDisplayText(num1);
            }
        } else if (input === 'c') {
            setDisplayText('0');
            num1 = null;
            num2 = null;
            operator = null;
        } else if (input === 'equals' && operator) {
            num2 = display.textContent;
            num1 = operate(num1, num2, operator);
            operator = null;
            setDisplayText(num1);
        } else if (input === ".") {
            if (!(display.textContent.includes('.'))) {
                if (display.textContent === '') {
                    display.textContent += "0.";
                } else {
                    display.textContent += input;
                }
            }
        } else if (input === "←") {
            if (!(display.textContent === "") && !(display.textContent === "0")) {
                display.textContent = display.textContent.slice(0, -1);
            }
            if (display.textContent === "") {
                display.textContent = "0";
            }
        } else if (input === "%") {
            num1 = operate(display.textContent, 0, input);
            setDisplayText(num1);
            num2 = null;
            operator = null;
        }
    }

    if (display.textContent === 'Infinity' || display.textContent === 'NaN') {
        setDisplayText("Cannot divide by 0.");
        num1 = null;
        num2 = null;
        operator = null;
    }
}

for (const element of btns) {
    element.addEventListener("click", (e) => {
        updateDisplay(e.target.id);
    })
}