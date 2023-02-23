import {ImageBackground, StyleSheet, Text, View} from 'react-native';
import React from 'react';

const Background = ({children}: any) => {
  return (
    <View>
      <ImageBackground
        source={require('../assets/bg.jpg')}
        style={styles.Image}
      />

      <View style={{position: 'absolute'}}>{children}</View>
    </View>
  );
};

export default Background;

const styles = StyleSheet.create({
  Image: {
    height: '100%',
  },
});
