import React from 'react';
import { View, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  card: {
    // shadow but only for ios
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.26,
    // shadow on android
    elevation: 8,
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
  },
});

const Card = (props) => (
  // allows you to add other styles from outside this component
  <View style={{ ...styles.card, ...props.style }}>{props.children}</View>
);

export default Card;
