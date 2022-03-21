import React from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

const styles = StyleSheet.create({
  message: {
    color: 'red',
  },
});

const Message = (props) => (
  <View style={styles.message}>
    <Text>
      {props.message}
    </Text>
  </View>
);

export default Message;
