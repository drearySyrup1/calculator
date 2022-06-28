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
    currentNum.num = 'num1';
    currentNum.value = num1.toString();

    num2 = '';

    if(num1.toString().length > 10) {
        num1 = num1.toFixed(10);
    }

    updateDisplay(num1);
}

let switcher = false;
let oper = '';
let num1 = '0';
let num2 = '';

let currentNum = {}


const display = document.getElementById('display');
const nums = Array.from(document.getElementById('nums').children);

const ops = Array.from(document.getElementById('ops').children);

const keyboardKeys = [
    '0', '1', '2',
    '3', '4', '5',
    '6', '7', '8',
    '9', '.', 'Backspace'
]

const keyboardOps = [
    '+', '-', '*', '/'
]

const equalButton = document.getElementById('eq');
const clearButton = document.getElementById('cl');
const dot = document.getElementById('dot');


nums.forEach(num => {
    num.addEventListener('click', e => {

        if (num1.toString() === '0' && e.target.id === '0') {
            return;
        }

        if (oper === 'div' && e.target.id === '0') {
            console.log('asd')
            updateDisplay('You broke Calculator')
            num1 = '';
            num2 = '';
            oper = '';
            switcher = false;
            return;
        }

        if (e.target === dot) {
        dot.disabled = true;
        }

        if (e.target.id === 'del') {

            if (Object.keys(currentNum).length === 0) return;

            currentNum.value = currentNum.value.split('');
            currentNum.value.pop();
            currentNum.value = currentNum.value.join('');

            if (currentNum.value === '') {
                currentNum.value = '0';
            }

            if (currentNum.num === 'num1') {
                num1 = currentNum.value;
                updateDisplay(num1);
            } else {
                num2 = currentNum.value;
                updateDisplay(num2);
            }

            return;
        }

        if(!switcher) {
            if(!(num1.length >= 12)) {
            num1 = (num1 === '0' && e.target !== dot) ? e.target.innerText : num1 + e.target.innerText;
            currentNum.num = 'num1';
            currentNum.value = num1;
            updateDisplay(num1)
            }
        } else {
            if(!(num2.length >= 12)) {
            num2 = (num2 === '0' && e.target !== dot) ? e.target.innerText : num2 + e.target.innerText;
            currentNum.num = 'num2';
            currentNum.value = num2;
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
        dot.disabled = false;
    })
})

clearButton.addEventListener('click', e => {
    num1 = '';
    num2 = '';
    oper = '';
    switcher = false;
    updateDisplay()
    dot.disabled = false;

})

equalButton.addEventListener('click', e => {
    if (num1 && num2) {
        clc();
        dot.disabled = false;

    }
})

window.addEventListener('keydown', e => {
    if (keyboardKeys.includes(e.key)) {

        if (num1.toString() === '0' && e.key === '0') {
            return;
        }

        if (oper === 'div' && e.key === '0') {
            console.log('asd')
            updateDisplay('You broke Calculator')
            num1 = '';
            num2 = '';
            oper = '';
            switcher = false;
            return;
        }

        if (e.key === '.') {
        dot.disabled = true;
        }

        if (e.key === 'Backspace') {


            if (Object.keys(currentNum).length === 0) return;

            currentNum.value = currentNum.value.split('');
            currentNum.value.pop();
            currentNum.value = currentNum.value.join('');

            if (currentNum.value === '') {
                currentNum.value = '0';
            }

            if (currentNum.num === 'num1') {
                num1 = currentNum.value;
                updateDisplay(num1);
            } else {
                num2 = currentNum.value;
                updateDisplay(num2);
            }

            return;
        }

        if(!switcher) {
            if(!(num1.length >= 12)) {
            num1 = (num1 === '0' && e.key !== '.') ? e.key : num1 + e.key;
            currentNum.num = 'num1';
            currentNum.value = num1;
            updateDisplay(num1)
            }
        } else {
            if(!(num2.length >= 12)) {
            num2 = (num2 === '0' && e.key !== '.') ? e.key : num2 + e.key;
            currentNum.num = 'num2';
            currentNum.value = num2;
            updateDisplay(num2)
            }
        }
    }

    if (keyboardOps.includes(e.key)) {
        updateDisplay();
        switcher = true;

        if (num1 && num2) {
            clc();
        }

        switch (e.key) {
            case '+':
                console.log('asd')
            oper = 'add';
            break;
            case '-':
            oper = 'sub';
            break;
            case '*':
            oper = 'mul';
            break;
            case '/':
            oper = 'div';
            break;
        }
        dot.disabled = false;
    }

    if (e.key === 'Enter') {
        if (num1 && num2) {
            clc();
            dot.disabled = false;
    
        }
    }

})

window.addEventListener('keydown', e => {

});

updateDisplay()