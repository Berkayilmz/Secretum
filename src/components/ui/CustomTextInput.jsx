import { StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'

const CustomTextInput = ({width, height, placeholder, onChangeText, secureTextEntry}) => {
  return (
    <TextInput
        placeholder={placeholder}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        style={[styles.textInput, {width, height}]}
    />
  )
}

export default CustomTextInput

const styles = StyleSheet.create({
    textInput: {
        borderWidth: 1,
        borderRadius: 10,
        color: 'black',
        marginVertical: 5,
        paddingHorizontal: 12,
        fontSize: 16
    }
})