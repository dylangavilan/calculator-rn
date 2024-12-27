import React, { useEffect } from 'react'
import { Platform } from 'react-native';
import { Slot } from 'expo-router'
import { useFonts } from 'expo-font';
import { StatusBar } from 'expo-status-bar'
import { SafeAreaView } from 'react-native-safe-area-context';
import * as NavigationBar from 'expo-navigation-bar'
import { globalStyles } from '@/styles/global-styles';


const isAndroid = Platform.OS === 'android'
if(isAndroid) {

  NavigationBar.setBackgroundColorAsync('black')
}

const _layout = () => {

  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  })
  
  useEffect(() => {
    if(loaded) {
      console.log('Fonts loaded')
    }
  }, [loaded])

  if(!loaded) {
    return null
  }

  return (
    <SafeAreaView style={globalStyles.background}>
      <Slot />
      <StatusBar style='light' />
    </SafeAreaView>
  )
}

export default _layout