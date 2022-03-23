import React from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

const styles = StyleSheet.create({
  message: {
    color: 'red',
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: 5,
  },
});

const Message = (props) => (
  <View>
    <Text style={styles.message}>
      {props.message}
    </Text>
  </View>
);

export default Message;
