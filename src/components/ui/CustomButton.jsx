// components/ui/CustomButton.js
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { useTheme } from '../../contexts/ThemeContext';

const CustomButton = ({
  title,
  width,
  height,
  onPress,
  backgroundColor,
  textColor,
  disabled = false
}) => {
  const theme  = useTheme();

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.7}
      style={[
        styles.touchableOpacity,
        {
          width,
          height,
          backgroundColor: backgroundColor || theme.primary,
          opacity: disabled ? 0.5 : 1,
          borderColor: theme.border
        }
      ]}
    >
      <Text style={[styles.text, { color: textColor || '#fff' }]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  touchableOpacity: {
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    marginBottom: 8,
  },
  text: {
    fontSize: 16,
    fontWeight: '600',
  },
});