import { Pressable, PressableProps, StyleSheet, Text } from 'react-native'
import React from 'react'
import { Colors } from '@/constants/Colors'
interface Props extends PressableProps {
    children: string;
    color?: string;
    blackText?: boolean;
    backgroundColor?: 'orange' | 'lightGray' | 'darkGray';
    doubleSize: boolean;
    onPress: () => void
}
import * as Haptics from 'expo-haptics';


const Btn = ({ children, 
    color = Colors.darkGray, 
    blackText = false,
    backgroundColor = 'darkGray',
    doubleSize =  false,
    onPress }: Props) => {

  return (
    <Pressable style={({ pressed}) => ({
        ...styles.btn,
        backgroundColor: Colors[backgroundColor],
        opacity: pressed ? 0.8 : 1,
        width: doubleSize ? 180 : 80
        })}
        onPress={() => { onPress(); Haptics.selectionAsync()}} 
        >
        <Text 
            style={{
                ...styles.text,
                color: blackText ? 'black' : 'white'
            }}>{children}</Text>
    </Pressable>
  )
}

const styles = StyleSheet.create({
    btn: {             
        height: 80,
        // width: 80,
        backgroundColor: Colors.darkGray,
        borderRadius: 100,
        marginHorizontal: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    text: {
        textAlign: 'center',
        padding: 10,
        fontSize: 30,
        color: 'white',
        fontWeight: '300'
    }
})
export default Btn