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
import { LinearGradient } from 'expo-linear-gradient';
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
    height: 480,
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'space-between',
    paddingBottom: 20,
    padding: 0,
  },
  button: {
    backgroundColor: Colors.primary,
  },
  input: {
    width: '100%',
  },
  buttonContainer: {
    height: 55,
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center',
    // borderWidth: 1,
  },

  linearGradient: {
    flex: 1,
  },
  link: {
    width: 176,
    flex: 1,
    color: 'black',
    fontWeight: 'bold',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    textAlignVertical: 'center',
    borderBottomWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.2)',

  },
  linkActive: {
    backgroundColor: '#1b1b1b',
    fontWeight: 'bold',
    color: 'white',
    borderColor: '#1b1b1b',
  },
  left: {
    borderTopLeftRadius: 10,
  },
  right: {
    borderTopRightRadius: 10,
  },
  logo: {
    width: '80%',
    height: 100,
    // borderWidth: 1,
    // borderColor: 'black',
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

      <LinearGradient
        colors={[Colors.primary, Colors.orangeyRed]}
        style={styles.linearGradient}
        start={{ x: 0.9, y: 0.1 }}
        end={{ x: 0.1, y: 0.5 }}
      >
        <View style={styles.screen}>
          <Card style={styles.container}>
            <View style={styles.buttonContainer}>
              <TouchableOpacity onPress={logInVisible ? null : toggleView}>
                <Text style={logInVisible
                  ? { ...styles.link, ...styles.linkActive, ...styles.left }
                  : styles.link}
                >
                  Log In
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={logInVisible ? toggleView : null}>
                <Text style={logInVisible
                  ? { ...styles.link, ...styles.right }
                  : { ...styles.link, ...styles.linkActive, ...styles.right }}
                >
                  Sign Up
                </Text>
              </TouchableOpacity>
            </View>

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

        </View>
      </LinearGradient>
    </TouchableWithoutFeedback>
  );
};

export default LandingPage;
