import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import React from 'react'

const CustomButton = ({
  title,
  width,
  height,
  onPress,
  backgroundColor = '#6C63FF',
  textColor = '#fff',
  disabled = false
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.7}
      style={[
        styles.touchableOpacity,
        { width, height, backgroundColor, opacity: disabled ? 0.5 : 1 }
      ]}
    >
      <Text style={[styles.text, { color: textColor }]}>{title}</Text>
    </TouchableOpacity>
  )
}

export default CustomButton

const styles = StyleSheet.create({
  touchableOpacity: {
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 4
  },
  text: {
    fontSize: 16,
    fontWeight: '600'
  }
})