import {StyleSheet, Text, View, Dimensions} from 'react-native';
import React, {useState, useEffect} from 'react';
import Btn from './Btn';
import Background from './Background';
import auth from '@react-native-firebase/auth';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Welcome = (props: any) => {
  const [userState, setUserState] = useState({});

  useEffect(() => {
    auth().onAuthStateChanged((user: any) => {
      if (user) {
        setUserState(user);
      }
    });
  }, []);

  const logout = () => {
    auth()
      .signOut()
      .then(() => props.navigation.replace('Home'));
  };

  return (
    <Background>
      <View
        style={{
          width: windowWidth,
          height: windowHeight,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text
          style={{
            color: '#000',
            marginBottom: 20,
            backgroundColor: '#fff',
            padding: 20,
            borderRadius: 10,
          }}>
          Welcome {userState.displayName}
        </Text>

        <Btn
          Press={() => logout()}
          btnLabel="Log out"
          btnColor="#000000"
          textColor="#ffffff"
        />
      </View>
    </Background>
  );
};

export default Welcome;

const styles = StyleSheet.create({});
