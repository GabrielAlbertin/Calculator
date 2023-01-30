import './Calculator.css'
import Button from '../components/Button'
import Display from '../components/Display'
import { useState } from 'react'

const Calculator = () => {
  const [initialValue, setInitialValue] = useState({display: 0, clearDisplay: false, operation: null,  value: [0,0], current: 0})

  const clearMemory = () => {
    const newInitialValue = {
      display: 0,
      clearDisplay: false,
      operation: null,
      value: [0,0],
       current: 0
    }
    setInitialValue(newInitialValue)
  }

  const setOperation = (op) => {
    if (initialValue.current === 0) {
      const newInitialValue = {
        ...initialValue,
        clearDisplay: true, 
        operation: op,
        current: 1,
      }
      setInitialValue(newInitialValue)
    } else {
      const equals = op === '='
      const currentOperation = initialValue.operation
      const values = initialValue.value

      switch(currentOperation){
        case '+':
          values[0] = values[0] + values[1]
          break;
        case '-':
          values[0] = values[0] - values[1]
          break;
        case '/':
          values[0] = values[0] / values[1]
          break;
        case '*':
          values[0] = values[0] * values[1]
          break;
        default:
          break;    
      }
      values[1] = 0;

      const newInitialValue = {
        ...initialValue,
        display: values[0],
        operation: equals ? null : op,
        current: equals ? 0 : 1,
        clearDisplay: !equals,
        value: values,
      }
      setInitialValue(newInitialValue)
    }
  }

  const addDigit = (n) => {
    if (n === '.' && initialValue.display.includes('.')) {
      return
    }

    const clearDisplay = initialValue.value === '0' || initialValue.clearDisplay
    const currentValue = clearDisplay ? '' : initialValue.display
    const diplayValue = currentValue === 0 ? n : `${currentValue}${n}`

    const i = initialValue.current
    const newValue = parseFloat(diplayValue)
    const val = initialValue.value
    if (n !== '.') {
      val[i] = newValue
    }

    const newInitialValue = {
      ...initialValue, 
      display: diplayValue,
      clearDisplay: false,
      value: val,
    }
    setInitialValue(newInitialValue)
    console.log(initialValue)
  }

  return(
  <div className="calculator">
    <Display value={initialValue.display}/>
    <Button label="AC" click={() => clearMemory()} triple/>
    <Button label="/" click={() => setOperation('/')} operation/>
    <Button label="7" click={() => addDigit(7)}/>
    <Button label="8" click={() => addDigit(8)}/>
    <Button label="9" click={() => addDigit(9)}/>
    <Button label="*" click={() => setOperation('*')} operation/>
    <Button label="4" click={() => addDigit(4)}/>
    <Button label="5" click={() => addDigit(5)}/>
    <Button label="6" click={() => addDigit(6)}/>
    <Button label="-" click={() => setOperation('-')} operation/>
    <Button label="1" click={() => addDigit(1)}/>
    <Button label="2" click={() => addDigit(2)}/>
    <Button label="3" click={() => addDigit(3)}/>
    <Button label="+" click={() => setOperation('+')} operation/>
    <Button label="0" click={() => addDigit(0)} double/>
    <Button label="." click={() => addDigit('.')}/>
    <Button label="=" click={() => setOperation('=')} operation/>
  </div>
  )
}

export default Calculator