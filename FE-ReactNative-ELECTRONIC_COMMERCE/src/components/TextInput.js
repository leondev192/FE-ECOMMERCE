// src/components/TextInput.js

import React from 'react';
import { TextInput as RNTextInput, StyleSheet } from 'react-native';
import PropTypes from 'deprecated-react-native-prop-types';


const TextInput = ({ value, onChangeText, placeholder, secureTextEntry }) => {
  return (
    <RNTextInput
      style={styles.input}
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
      secureTextEntry={secureTextEntry}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
});

export default TextInput;
