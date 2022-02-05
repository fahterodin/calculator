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
                alert('You can\'t divide by zero!');
                return; 
            }
            result = divide(+a, +b);
            break;
    } 
}

let vault = '';
let result = '';
let tempOperator = '';
let makeOp = false;

let current = document.getElementById('current');
let history = document.getElementById('history');
const inputNumber = document.getElementsByClassName('number');
const btnClear = document.getElementById('clear');
const inputOperator = document.getElementsByClassName('operator');
const equalOperator = document.getElementById('equal');
const toggleNegativeBtn = document.getElementById('toggleNegative');

//event listener

btnClear.addEventListener('click', (e) => clearAll(e));

for (const number of inputNumber) {
    number.addEventListener('click', () => writeNumber(number.textContent));
}

for (const operator of inputOperator) {
    operator.addEventListener('click', () => writeOperator(operator.textContent));
}

equalOperator.addEventListener('click', (e) => equal(e));

toggleNegativeBtn.addEventListener('click', (e) => toggleNegativeNumber(e));

// function ok

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
}

function toggleNegativeNumber(operator) {
    console.log(operator);
}

function writeNumber(number) {
    if (makeOp == true) {
        clearHistory();
        makeOp = false;
    }
    history.textContent += number;
}

function writeOperator(operator) {
    if (makeOp == true) {
        history.textContent = result;
        makeOp = false;
    }
    if (history.textContent == '' && result != '') {
        history.textContent = result;
    }
    history.textContent += ' ' + operator + ' ';
}

function equal() {
    const op = history.textContent.split(' ');
    if (op[op.length - 1] === '') {
        op.pop();
    }
    if (op.length % 2 == 0 || op.length == 1) {
        return
    }
    for (i = op.length; i > 3; i = op.length) {
        operate(op[0], op[2], op[1]);
        op.splice(0, 3, result);
    }
    operate(op[0], op[2], op[1]);
    current.textContent = result;
    makeOp = true;
}




//functions

function writeDisplay(item) {
    writeNumber(item);
    console.log(vault.length);
    if (vault.length < 2) { 
        if (typeof item === 'string') {
            vault[0] = currentDisplay.textContent;
            vault[1] = item;
            clearCurrentDisplay();
        }
    } else if (vault.length = 2) {
        equalResult(item);
    }
}


function equalResult(item) {
    if (typeof item === 'string') {
        vault.push(currentDisplay.textContent);
        result = operate(vault[0], vault[2], vault[1]);
        resetVault();
        clearCurrentDisplay();
        writeResult();
        vault[0] = result;
        vault[1] = item;
        console.log(vault);
    }
}

function writeResult() {
    currentDisplay.textContent = result;
}

function resetVault() {
    vault.length = 0;
}








// pseudocode per quando clicco su operatore:
// la funzione prende il numero che si trova nel currentDisplay e lo prende come operando
// variabile operatore letta dall'event listener
// prende questi valori e li mette su last display


//prende il testo del bottone operatore, lo salva


