import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from 'react-native';

const styles = StyleSheet.create({
  message: {
    color: 'red',
  },
});

const Message = (props) => <View style={styles.message}>{props.message}</View>;

export default Message;
