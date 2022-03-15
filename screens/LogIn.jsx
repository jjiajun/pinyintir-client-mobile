import React, { useState, useContext } from "react";
import { StatusBar } from "expo-status-bar";
import axios from "axios";
import { REACT_APP_BACKEND } from "react-native-dotenv";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import Message from "../components/Message.jsx";
import Colors from "../constants/colors.js";
import Input from "../components/Input.jsx";
import Card from "../components/Card.jsx";
import CustomButton from "../components/CustomButton.jsx";

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    marginVertical: 10,
    color: "black",
  },
  container: {
    width: 300,
    maxWidth: "80%",
    height: 300,
    alignItems: "center",
    display: "flex",
    justifyContent: "center",
  },
  button: {
    backgroundColor: Colors.primary,
  },
  input: {
    width: 150,
  },
});

const LogIn = ({ navigation }) => {
  // State and setter for login details
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // State and setter for signup and login message
  const [message, setMessage] = useState("");

  const loginAttempt = () => {
    // immediately reject log in if there is a missing field\
    if (!email || !password) {
      setMessage("Please enter an email and password");
    }
    // wrap email and data in an object for easier manipulation
    const data = {
      email,
      password,
    };
    // verify log in. if not verified, send error messages
    axios
      .post(`${REACT_APP_BACKEND}/login`, data)
      .then((response) => {
        // If username or password incorrect, inform player
        if (response.data === "The email or password is incorrect") {
          setMessage("Invalid login. Please try again.");
        }
        // If successful, redirect to home page
        if (response.data.success === true) {
          const { userId, token } = response.data;
          console.log("userId: ", userId);
          console.log("token: ", token);
          const storeData = async () => {
            await AsyncStorage.setItem("@sessionToken", token);
            await AsyncStorage.setItem("@userId", userId);
          };
          storeData().then(() => navigation.navigate("Scan"));
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss;
      }}
    >
      <View style={styles.screen}>
        <Text style={styles.title}>Log In</Text>
        <Card style={styles.container}>
          <Input
            style={styles.input}
            placeholder="Email"
            blurOnSubmit
            autoCapitalize="none"
            autoCorrect={false}
            onChangeText={(el) => setEmail(el)}
            value={email}
          />
          <Input
            style={styles.input}
            placeholder="Password"
            blurOnSubmit
            autoCapitalize="none"
            autoCorrect={false}
            onChangeText={(el) => setPassword(el)}
            value={password}
          />
          <CustomButton
            style={styles.button}
            title="Log In"
            color={Colors.primary}
            onPress={loginAttempt}
          />
          <View>{message !== "" && <Message message={message} />}</View>
        </Card>
        <StatusBar style="auto" />
      </View>
    </TouchableWithoutFeedback>
  );
};

export default LogIn;
