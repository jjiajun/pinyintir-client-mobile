import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  Image,
  Text,
  TouchableOpacity,
} from 'react-native';
import Colors from '../utils/colors.js';
import Card from '../components/Card.jsx';
import LogInBox from '../components/LogInBox.jsx';
import SignUpBox from '../components/SignUpBox.jsx';
import Message from '../components/Message.jsx';

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    width: 400,
    maxWidth: '90%',
    height: 350,
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center',
    marginBottom: 10,
  },
  button: {
    backgroundColor: Colors.primary,
  },
  input: {
    width: '100%',
  },
  buttonContainer: {
    // flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '100%',
    // alignItems: 'flex-end',
  },
  link: {
    color: Colors.orangeyRed,
    padding: 10,
  },
  linkActive: {
    backgroundColor: Colors.secondary,
    fontWeight: 'bold',
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 10,
  },
  logo: {
    width: '80%',
    height: 100,
    marginBottom: 20,
  },
});

const LandingPage = ({ navigation }) => {
  const [logInVisible, setLogInVisible] = useState(true);
  const [message, setMessage] = useState('');

  const toggleView = () => {
    setLogInVisible((prev) => !prev);
    setMessage('');
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.screen}>
        <Card style={styles.container}>
          <Image
            // eslint-disable-next-line global-require
            source={require('../assets/pinyintir.png')}
            style={styles.logo}
          />

          {logInVisible
            ? (
              <LogInBox navigation={navigation} setMessage={setMessage} />
            ) : (
              <SignUpBox navigation={navigation} setMessage={setMessage} />
            )}
        </Card>

        {message !== '' && <Message message={message} />}

        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={logInVisible ? null : toggleView}>
            <Text style={logInVisible ? { ...styles.link, ...styles.linkActive } : styles.link}>
              Log In
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={logInVisible ? toggleView : null}>
            <Text style={logInVisible ? styles.link : { ...styles.link, ...styles.linkActive }}>
              Sign Up
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default LandingPage;
