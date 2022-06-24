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

function operate(op, a, b) {
    return op(a, b);
}

function updateDisplay(a='0') {
    display.innerText = a;
}

function clc() {
    num1 = parseFloat(num1);
    num2 = parseFloat(num2);
    switch(oper) {
        case 'add':
        num1 = operate(add, num1, num2)
        break;
        case 'sub':
        num1 = operate(subtract, num1, num2)
        break;
        case 'mul':
        num1 = operate(multiply, num1, num2)
        break;
        case 'div':
        num1 = operate(divide, num1, num2)
        break;
    }

    num2 = '';

    if(num1.toString.length > 12) {
        num1 = num1.toString.toFixed(12);
    }

    updateDisplay(num1);
}

let switcher = false;
let oper = '';
let num1 = '';
let num2 = '';

let temp = ''; 

const display = document.getElementById('display');
const nums = Array.from(document.getElementById('nums').children);

const ops = Array.from(document.getElementById('ops').children);

const equalButton = document.getElementById('eq');
const clearButton = document.getElementById('cl');


nums.forEach(num => {
    num.addEventListener('click', e => {
        if(!switcher) {
            if(!(num1.length >= 12)) {
            num1 += e.target.innerText;
            updateDisplay(num1)
            }
        } else {
            if(!(num2.length >= 12)) {
            num2 += e.target.innerText;
            updateDisplay(num2)
            }
        }
    })
})


ops.forEach(op => {
    op.addEventListener('click', e => {
        updateDisplay();
        switcher = true;

        if (num1 && num2) {
            clc();
        }

        oper = e.target.id;
    })
})

clearButton.addEventListener('click', e => {
    num1 = '';
    num2 = '';
    oper = '';
    switcher = false;
    updateDisplay()
})

equalButton.addEventListener('click', e => {
    if (num1 && num2) {
        clc();
    }
})

updateDisplay()