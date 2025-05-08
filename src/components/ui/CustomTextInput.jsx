// components/ui/CustomTextInput.js
import { StyleSheet, TextInput } from 'react-native';
import React from 'react';
import { useTheme } from '../../contexts/ThemeContext';

const CustomTextInput = ({
  width,
  height,
  placeholder,
  onChangeText,
  secureTextEntry
}) => {
  const theme  = useTheme();

  return (
    <TextInput
      multiline={true}
      placeholder={placeholder}
      placeholderTextColor={theme.placeholder}
      onChangeText={onChangeText}
      secureTextEntry={secureTextEntry}
      style={[
        styles.textInput,
        {
          width,
          height,
          backgroundColor: theme.inputBackground,
          borderColor: theme.border,
          color: theme.text
        }
      ]}
    />
  );
};

export default CustomTextInput;

const styles = StyleSheet.create({
  textInput: {
    borderWidth: 1,
    borderRadius: 10,
    marginVertical: 5,
    paddingHorizontal: 12,
    fontSize: 16,
    textAlignVertical: 'top',
  },
});