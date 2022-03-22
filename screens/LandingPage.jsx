import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  Image,
  Text,
} from 'react-native';
import Colors from '../constants/colors.js';
import Card from '../components/Card.jsx';
import LogInBox from '../components/LogInBox.jsx';
import SignUpBox from '../components/SignUpBox.jsx';

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    marginVertical: 10,
    color: 'black',
  },
  container: {
    width: 300,
    maxWidth: '80%',
    height: 350,
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center',
  },
  button: {
    backgroundColor: Colors.primary,
  },
  input: {
    width: '100%',
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '100%',
    alignItems: 'flex-end',
  },
});

const LandingPage = ({ navigation }) => {
  const [signUpVisible, setSignUpVisible] = useState(false);
  const [logInVisible, setLogInVisible] = useState(true);

  const toggleLogIn = () => {
    setLogInVisible(true);
    setSignUpVisible(false);
  };
  const toggleSignUp = () => {
    setLogInVisible(false);
    setSignUpVisible(true);
  };

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}
    >
      <View style={styles.screen}>
        <Card style={styles.container}>
          <Image
            // eslint-disable-next-line global-require
            source={require('../assets/pinyintir.png')}
            style={{ width: '80%', height: 100 }}
          />

          {logInVisible && <LogInBox navigation={navigation} />}
          {signUpVisible && <SignUpBox navigation={navigation} />}
          <View style={styles.buttonContainer}>
            <Text onPress={toggleLogIn}>Login</Text>
            <Text onPress={toggleSignUp}>Signup</Text>
          </View>
        </Card>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default LandingPage;
