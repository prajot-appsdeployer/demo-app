import {StyleSheet, Text, View, Dimensions} from 'react-native';
import React, {useEffect} from 'react';
import Background from './Background';
import Btn from './Btn';

import auth from '@react-native-firebase/auth';

const windowWidth = Dimensions.get('window').width;

const Home = (props: any): JSX.Element => {
  useEffect(() => {
    auth().onAuthStateChanged(user => {
      if (user) {
        props.navigation.replace('Welcome');
      }
    });
  }, []);

  return (
    <Background>
      <View style={styles.content}>
        <Text style={styles.heading}>Welcome to the App!</Text>
        <Btn
          Press={() => props.navigation.navigate('Login')}
          btnLabel="Login"
          btnColor="#000000"
          textColor="#ffffff"
        />
        <Btn
          Press={() => props.navigation.navigate('Signup')}
          btnLabel="Signup"
          btnColor="#ffffff"
          textColor="#000000"
        />
      </View>
    </Background>
  );
};

export default Home;

const styles = StyleSheet.create({
  content: {
    marginVertical: 100,
    width: windowWidth,
    alignItems: 'center',
  },

  heading: {
    color: 'white',
    fontSize: 50,
    textAlign: 'center',
    marginBottom: 40,
  },
});
