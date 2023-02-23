import {
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  ToastAndroid,
} from 'react-native';
import React, {useState} from 'react';
import Background from './Background';
import {Dimensions} from 'react-native';
import {BlurView} from '@react-native-community/blur';
import Btn from './Btn';
import InputFields from './InputFields';
import auth from '@react-native-firebase/auth';
import firestore, {firebase} from '@react-native-firebase/firestore';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Login = (props: any) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const signIn = () => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;

    if (!email || email === '' || email === ' ' || reg.test(email) === false) {
      ToastAndroid.show('Please provide valid email', ToastAndroid.SHORT);
    } else if (!password || password === '' || password === ' ') {
      ToastAndroid.show('Please enter the password', ToastAndroid.SHORT);
    } else {
      auth()
        .signInWithEmailAndPassword(email, password)
        .then(() => {
          props.navigation.navigate('Welcome');
        })
        .catch(error => {
          ToastAndroid.show(error.message, ToastAndroid.SHORT);
        });
    }
  };

  return (
    <Background>
      <View style={styles.content}>
        <View>
          <Text style={styles.heading}>Login</Text>
        </View>

        <View style={styles.formContainer}>
          <BlurView
            blurType="light"
            blurAmount={3}
            style={styles.formCard}
            reducedTransparencyFallbackColor="white">
            <View style={styles.form}>
              <View>
                <Text>Email</Text>
                <InputFields
                  onChangeText={(text: any) => setEmail(text)}
                  value={email}
                  placeholder="Enter email"
                  keyboardType="email-address"
                />

                <Text>Password</Text>
                <InputFields
                  onChangeText={(text: any) => setPassword(text)}
                  value={password}
                  placeholder="Enter your password"
                  secureTextEntry={true}
                />

                <View style={{marginTop: 25}}>
                  <Btn
                    Press={() => signIn()}
                    btnLabel="Login"
                    btnColor="#000000"
                    textColor="#ffffff"
                  />

                  <View
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'center',
                    }}>
                    <Text style={{fontSize: 16, fontWeight: 'bold'}}>
                      Don't have an account ?
                    </Text>
                    <TouchableOpacity
                      onPress={() => props.navigation.navigate('Signup')}>
                      <Text
                        style={{
                          color: '#000',
                          fontWeight: 'bold',
                          fontSize: 16,
                        }}>
                        Sign up
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          </BlurView>
        </View>
      </View>
    </Background>
  );
};

export default Login;

const styles = StyleSheet.create({
  content: {
    alignItems: 'center',
    justifyContent: 'center',
    height: windowHeight,
    width: windowWidth,
  },

  heading: {
    color: 'white',
    fontSize: 50,
    marginBottom: 30,
  },

  formContainer: {
    height: 350,
    width: '95%',
  },

  formCard: {
    height: '100%',
    width: '100%',
    justifyContent: 'center',
  },
  form: {
    padding: 10,
    alignItems: 'center',
  },
});
