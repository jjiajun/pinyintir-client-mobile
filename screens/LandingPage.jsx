// import axios from "axios";
// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import LoginBox from "./LoginBox";
// import SignupBox from "./SignupBox";
// const { REACT_APP_BACKEND } = process.env;

// export default function LandingPage({ user }) {
//   const [signUpVisible, setSignUpVisible] = useState(false);
//   const [logInVisible, setLogInVisible] = useState(true);

//   const toggleLogIn = () => {
//     setLogInVisible(true);
//     setSignUpVisible(false);
//   };
//   const toggleSignUp = () => {
//     setLogInVisible(false);
//     setSignUpVisible(true);
//   };

//   return (
//     <div className="flex flex-grow bg-primary text-gray-900 items-center justify-center">
//       <div className="">
//         <div className="text-7xl font-mono font-bold mb-12 text-white">
//           Trace<span className="text-secondary">YourEther</span>
//         </div>
//         <div className="flex justify-center">
//           <div className=" shadow-background w-96 h-80 rounded-lg bg-white my-5">
//             <div className="flex flex-row justify-center">
//               <h6
//                 className="bg-primary w-2/4 text-2xl p-2 border-l-2 border-t-2 rounded-tl-lg text-white"
//                 onClick={toggleLogIn}
//               >
//                 Log In
//               </h6>
//               <h6
//                 className="bg-primary w-2/4 text-2xl p-2 border-r-2 border-t-2 rounded-tr-lg text-white"
//                 onClick={toggleSignUp}
//               >
//                 Sign Up
//               </h6>
//             </div>
//             {logInVisible && <LoginBox user={user} />}
//             {signUpVisible && <SignupBox />}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

import React, { useState } from 'react';
import axios from 'axios';
import { REACT_APP_BACKEND } from 'react-native-dotenv';
import PropTypes from 'prop-types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  Image,
  Text,
} from 'react-native';
import Message from '../components/Message.jsx';
import Colors from '../constants/colors.js';
import Input from '../components/Input.jsx';
import Card from '../components/Card.jsx';
import CustomButton from '../components/CustomButton.jsx';
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

// LogIn.propTypes = {
//   navigation: PropTypes.shape({
//     navigate: PropTypes.func.isRequired,
//   }).isRequired,
// };

export default LandingPage;
