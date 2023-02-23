import {TouchableOpacity, StyleSheet, Text, View} from 'react-native';
import React from 'react';

interface Props {
  Press: Function;
  btnColor: string;
  textColor: string;
  btnLabel: string;
}

const Btn = ({Press, btnColor, textColor, btnLabel}: Props) => {
  return (
    <TouchableOpacity onPress={() => Press()} style={styles(btnColor).btn}>
      <Text style={{color: textColor, fontSize: 22, fontWeight: 'bold'}}>
        {btnLabel}
      </Text>
    </TouchableOpacity>
  );
};

export default Btn;

const styles = (btnColor: string) =>
  StyleSheet.create({
    btn: {
      backgroundColor: btnColor,
      borderRadius: 100,
      alignItems: 'center',
      width: 250,
      paddingVertical: 5,
      marginBottom: 20,
    },
  });
