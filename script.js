const add = (a, b) => a + b;

const subtract = (a, b) => a- b;

const multiply = (a, b) => a * b;
 
const divide = (a, b) => a / b;

function operate (a, b, operator) {
    switch (operator) {
        case '+':
            result = add(+a, +b);
            break;
        case '-':
            result = subtract(+a, +b);
            break;
        case '*':
            result = multiply(+a, +b);
            break;
        case '/':
            if (b == 0) {
                result = 'You can\'t divide by zero!';
                return; 
            }
            result = divide(+a, +b);
            break;
    } result = +(result.toFixed(3));
}

let result = '';
let equalHit = false;
let op = '';

let current = document.getElementById('current');
let history = document.getElementById('history');
const inputNumber = document.getElementsByClassName('number');
const btnClear = document.getElementById('clear');
const inputOperator = document.getElementsByClassName('operator');
const equalOperator = document.getElementById('equal');
const back = document.getElementById('back');

//event listener

btnClear.addEventListener('click', (e) => clearAll(e));

for (const number of inputNumber) {
    number.addEventListener('click', () => writeNumber(number.textContent));
}

for (const operator of inputOperator) {
    operator.addEventListener('click', () => writeOperator(operator.textContent));
}

equalOperator.addEventListener('click', (e) => equal(e));

back.addEventListener('click', (e) => backSpace(e));

document.addEventListener('keydown', (e) => writeKey(e));



// function ok

function writeKey(key) {
    const numbKey = [48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 190];
    const operKey = [56, 187, 189, 191]
    const foundNum = numbKey.find(e => e == key.keyCode);
    const foundOper = operKey.find(e => e == key.keyCode);
    if (foundNum != undefined && key.key != '*') {
        writeNumber(key.key);
    }
    if (foundOper != undefined && key.key != '=' && key.key != '8') {
        writeOperator(key.key);
    }
    if (key.keyCode == 8) {
        backSpace();
    }
    if (key.key == '=') {
        equal();
    }
    if (key.key == 'Delete') {
        clearAll();
    }
}

function clearCurrent() {
    current.textContent = '';
} 

function clearHistory() {
    history.textContent = '';
}

function clearAll() {
    clearCurrent();
    clearHistory();
    result = '';
    op = '';
    equalHit = false;
}

function toggleNegativeNumber(operator) {
    console.log(operator);
}

function backSpace() {
    history.textContent = history.textContent.slice(0, -1);
}

function writeNumber(number) {
    if (equalHit == true) {
        clearHistory();
        equalHit = false;
    }
    history.textContent += number;
}

function writeOperator(operator) {
    if (equalHit == true) {
        history.textContent = result;
        equalHit = false;
    }
    if (history.textContent == '' && result != '') {
        history.textContent = result;
    }
    history.textContent += ' ' + operator + ' ';
    createArray();
    if (op[0] == '') {
        op.shift();
    }
    if (op[0] === '*' || op[0] === '/') {
        clearAll();
    }
    if (op.length == 4) {
        triggerOperate();
    }
}

function equal() {
    createArray();
    if (op.length != 3) {
        return;
    }
    triggerOperate();
    equalHit = true;
}

function triggerOperate() {
    operate(op[0], op[2], op[1]);
    op.splice(0, 3, result);
    history.textContent = op.join(' ') + ' ';
    current.textContent = result;
}

function createArray() {
    op = history.textContent.split(' ');
    if (op[op.length - 1] === '') {
        op.pop();
    }
}
