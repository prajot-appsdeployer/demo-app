import {StyleSheet, Text, TextInput} from 'react-native';
import React from 'react';

const InputFields = (props: any) => {
  return (
    <TextInput
      {...props}
      style={styles.input}
      placeholderTextColor="#c5c5c5"></TextInput>
  );
};

export default InputFields;

const styles = StyleSheet.create({
  input: {
    backgroundColor: '#fff',
    borderRadius: 100,
    color: '#000',
    paddingHorizontal: 10,
    width: 250,
    marginBottom: 10,
  },
});
