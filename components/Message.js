import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from "react-native";

const Message = (props) => {
  return <View style={styles.message}>{props.message}</View>;
};

const styles = StyleSheet.create({
  message: {
    color: "red",
  },
});

export default Message;
