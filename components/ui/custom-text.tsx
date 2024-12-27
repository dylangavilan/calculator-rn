import { View, Text, type TextProps } from 'react-native'
import React from 'react'
import { globalStyles } from '@/styles/global-styles'

interface Props extends TextProps {
  variant?: 'h1' | 'h2'
}

const CustomText = ({ children, variant, ...props  }: Props) => {
  return (
      <Text style={[
        { color: 'white', fontFamily: 'Space-mono' },
        variant === 'h1' && globalStyles.mainResult,
        variant === 'h2' && globalStyles.secondaryResult
      ]}
      numberOfLines={1} 
      adjustsFontSizeToFit
      {...props}>
      {children}
      </Text>
  )
}

export default CustomText