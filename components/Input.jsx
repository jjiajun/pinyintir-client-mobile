import React from 'react';
import { TextInput, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  input: {
    height: 35,
    borderColor: '#8C8D8D',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginVertical: 6,
  },
});

const Input = (props) => <TextInput {...props} style={{ ...styles.input, ...props.style }} />;

export default Input;
