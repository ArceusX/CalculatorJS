class Calculator {

    currentOperand;
    previousOperand;
    operator;

    constructor(previousOperandText, currentOperatorText) {
        this.previousOperandText = previousOperandText;
        this.currentOperandText = currentOperandText;
        this.clear();
    }

    append(digit) {
        if (digit === '.' && this.currentOperand.toString().includes('.')) return;
        this.currentOperand += digit.toString();
    }

    assignOperator(operator) {
        if (this.currentOperand.length === 0) return;
        if (this.previousOperand.length !== 0) {
            this.evaluate();
        }
        this.operator = operator;
        this.previousOperand = this.currentOperand;
        this.currentOperand = '';
    }

    clear() {
        this.currentOperand = '';
        this.previousOperand = '';
        this.operator = undefined;
    }

    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1)
    }

    evaluate() {
        let result;
        const operand1 = parseFloat(this.previousOperand);
        const operand2 = parseFloat(this.currentOperand);

        if (!isNaN(operand1) && !isNaN(operand2)) {
            switch (this.operator) {
                case '+':
                    result = operand1 + operand2;
                    break;

                case '-':
                    result = operand1 - operand2;
                    break;

                case '*':
                    result = operand1 * operand2;
                    break; 

                case '÷':
                    result = operand1 / operand2;
                    break;

                default:
                    break;
            }

            this.currentOperand = result;
            this.operator = undefined;
            this.previousOperand = '';
        }
    }

    updateDisplay() {
        this.currentOperandText.innerText = this.addCommas(this.currentOperand.toString()).substring(0, 17);
        this.previousOperandText.innerText = this.addCommas(this.previousOperand.toString()).substring(0, 17);
        
        if (this.operator != null) {
            this.previousOperandText.innerText += ' ' + this.operator.toString();
        }
    }

    addCommas(str) {
        let result = '';
        const [beforeDecimal, afterDecimal] = str.split('.');
        let intVal = parseFloat(beforeDecimal);

        if (!isNaN(intVal)) {
            result = intVal.toLocaleString('en', {maximumFractionDigits: 0 });
        }

        if (afterDecimal != null) {
            result += '.' + afterDecimal;
        }

        return result;

    }
}

const btnsDigit = document.querySelectorAll('[data-digit]');
const btnsOperator = document.querySelectorAll('[data-operator]');
const btnEqual = document.querySelector('[data-equal');
const btnDEL = document.querySelector('[data-DEL');
const btnClear = document.querySelector('[data-clear]');
const previousOperandText = document.querySelector('[data-previous-operand]');
const currentOperandText = document.querySelector('[data-current-operand]');

const calculator = new Calculator(previousOperandText, currentOperandText);

btnsDigit.forEach(btn => {
    btn.addEventListener('click', () => {
        calculator.append(btn.innerText);
        calculator.updateDisplay()
    })
})

btnsOperator.forEach(btn => {
    btn.addEventListener('click', () => {
      calculator.assignOperator(btn.innerText)
      calculator.updateDisplay()
    })
})


btnEqual.addEventListener('click', () => {
    calculator.evaluate();
    calculator.updateDisplay();
})

btnClear.addEventListener('click', () => {
    calculator.clear();
    calculator.updateDisplay();
})

btnDEL.addEventListener('click', () => {
    calculator.delete();
    calculator.updateDisplay();
})
