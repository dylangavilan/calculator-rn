import { View, Text } from 'react-native'
import React from 'react'
import { globalStyles } from '@/styles/global-styles'
import CustomText from '@/components/ui/custom-text'
import Btn from '@/components/ui/btn'
import { Operator, useCalculator } from '../hooks/useCalculator';

const values = [
  ['AC', '+/-', 'del', '/'], 
  ['7', '8', '9', 'X'],
  ['4', '5', '6', '-'], 
  ['1', '2', '3', '+'], 
  ['0', '.', '=']]

const CalculatorApp = () => {

  const handlePress = (value: string) => {
    if (!isNaN(Number(value))) {
      return handleNumber(value);
    }
    switch(value){
      case 'AC': return clean()
      case '+/-': return positiveNegative()
      case 'del': return delLastNumber()
      case '/': return handleOperation(Operator.divide)
      case 'X': return handleOperation(Operator.multiply)
      case '=': return getResult()
      case '.': return handleNumber(value)
      case '+': return handleOperation(Operator.add)
      case '-': return handleOperation(Operator.subtract)
    }
  }

  const { 
    number, 
    prevResult, 
    handleNumber, 
    clean, 
    positiveNegative, 
    handleOperation,
    delLastNumber,
    getResult } = useCalculator()

  return (
    <View style={globalStyles.calculatorContainer}>
      <View style={{ padding: 20 }}>
        <CustomText variant='h1'> 
         {number}
        </CustomText>
        <CustomText variant='h2'>
          {prevResult !== '0' && `${prevResult}`}
        </CustomText>
      </View>
      {values.map((row, columnIndex) => (
        <View key={columnIndex} style={globalStyles.row}>
          {row.map((value, rowIndex) => (
            <Btn 
               onPress={() => handlePress(value)}
               doubleSize={row.length === 3 && rowIndex === 0}
               key={rowIndex}
               blackText={rowIndex < 3 && columnIndex === 0}
               backgroundColor={rowIndex === row.length - 1 ? 
                'orange' : 
                columnIndex === 0 ? 'lightGray' : 'darkGray' }>{value}</Btn>
          ))}
        </View>
      ))}
    </View>
  )
}

export default CalculatorApp