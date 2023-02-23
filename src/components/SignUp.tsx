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

const Signup = (props: any) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const registerUser = async () => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;

    if (!fullName || fullName === '' || fullName === ' ') {
      ToastAndroid.show('Please enter a valid name', ToastAndroid.SHORT);
    } else if (
      !email ||
      email === '' ||
      email === ' ' ||
      reg.test(email) === false
    ) {
      ToastAndroid.show('Please provide valid email', ToastAndroid.SHORT);
    } else if (!password || password === '' || password === ' ') {
      ToastAndroid.show('Please enter the password', ToastAndroid.SHORT);
    } else {
      auth()
        .createUserWithEmailAndPassword(email, password)
        .then(async authState => {
          await firebase.auth().currentUser?.updateProfile({
            displayName: fullName,
          });

          await firestore()
            .collection('usersdetails')
            .doc(authState.user.uid)
            .set({
              id: authState.user.uid,
              email: email,
              name: fullName,
            })
            .catch((err: any) =>
              ToastAndroid.show(err.message, ToastAndroid.SHORT),
            );
        })
        .then(() => {
          ToastAndroid.show('User Registered', ToastAndroid.SHORT);
          props.navigation.replace('Welcome');
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
          <Text style={styles.heading}>Sign Up</Text>
        </View>

        <View style={styles.formContainer}>
          <BlurView
            blurType="light"
            blurAmount={3}
            style={styles.formCard}
            reducedTransparencyFallbackColor="white">
            <View style={styles.form}>
              <View>
                <Text>Full Name</Text>
                <InputFields
                  onChangeText={(text: any) => setFullName(text)}
                  value={fullName}
                  placeholder="Enter full name"
                />

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
                  placeholder="Enter password"
                  secureTextEntry={true}
                />

                <View style={{marginTop: 25}}>
                  <Btn
                    Press={() => registerUser()}
                    btnLabel="Sign up"
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
                      Already have an account ?{' '}
                    </Text>
                    <TouchableOpacity
                      onPress={() => props.navigation.navigate('Login')}>
                      <Text
                        style={{
                          color: '#000',
                          fontWeight: 'bold',
                          fontSize: 16,
                        }}>
                        Login
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

export default Signup;

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
    height: 400,
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
