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
    height: 455,
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'flex-start',
    marginBottom: 10,
    padding: 0,
    // paddingHorizontal: 0,
    // paddingTop: 0,
    // paddingBottom: 40,

  },
  button: {
    backgroundColor: Colors.primary,
  },
  input: {
    width: '100%',
  },
  buttonContainer: {
    // flex: 1,
    height: 75,
    flexDirection: 'row',
    // borderWidth: 1,
    width: '100%',
    justifyContent: 'center',
    // paddingBottom: 20,
    // width: '100%',
    // alignItems: 'flex-end','
  },
  link: {
    // color: Colors.orangeyRed,
    width: 176,
    flex: 1,
    color: 'black',
    fontWeight: 'bold',
    padding: 10,
    marginBottom: 20,
    // borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  linkActive: {
    backgroundColor: Colors.orangeyRed,
    // Colors.secondary,
    fontWeight: 'bold',
    color: 'white',
    // borderWidth: 1,
    // borderColor: 'black',
    // borderRadius: 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  logo: {
    width: '80%',
    height: 100,
    marginBottom: 40,
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
    </TouchableWithoutFeedback>
  );
};

export default LandingPage;
