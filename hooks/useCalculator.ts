import { useRef, useState } from "react"

export enum Operator {
    add = '+',
    subtract = '-',
    multiply = '*',
    divide = '/'
}

export const useCalculator = () => {

    const [number, setNumber] = useState<string>('0')
    const [prevNumber, setPrevNumber] = useState<string>('0')

    const lastOperation = useRef<Operator>();

    const handleNumber = (textNumber: string) => {
        // if the number is 0, replace

        if(number === '0' && textNumber !== '.') {
            return setNumber(textNumber)
        }
        // if the number includes decimal, don't allow another decimal
        if(number.includes('.') && textNumber === '.') return
        setNumber(number + textNumber)
    }

    const delLastNumber = () => {
      if(number.length=== 1 || (number.length === 2 && number.includes('-'))) {
        setNumber('0')
      }
      else {
        setNumber(number.substring(0, number.length - 1))
      }
    }

    const positiveNegative = () => { 
        if(number === '0') return;
        setNumber(`${number.includes('-') ? number.replace('-', '') : '-' + number}`)
    }


    const handleOperation = (operation: Operator) => {
        if (prevNumber === "0") {
          setPrevNumber(number);
          setNumber("0");
          lastOperation.current = operation;
        } else {
          calculate();
          lastOperation.current = operation;
        }
    };

  const calculate = () => {
    if (!lastOperation.current) return;

    const num1 = parseFloat(prevNumber);
    const num2 = parseFloat(number);

    let result: number;
    switch (lastOperation.current) {
      case Operator.add:
        result = num1 + num2;
        break;
      case Operator.subtract:
        result = num1 - num2;
        break;
      case Operator.multiply:
        result = num1 * num2;
        break;
      case Operator.divide:
        if (num2 === 0) {
          alert("Cannot divide by zero");
          return;
        }
        result = num1 / num2;
        break;
      default:
        return;
    }

    setPrevNumber(`${result}`);
    setNumber("0");
  };

    const clean = () => {
      setNumber('0')
      setPrevNumber('0')
      lastOperation.current = undefined
    }

    return {
        prevResult: prevNumber,
        number,
        handleNumber, 
        clean,
        positiveNegative,
        handleOperation,
        delLastNumber,
        getResult: calculate
    }

}