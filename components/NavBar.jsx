import React from 'react';
import { View, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  navbar: {
    // shadow but only for ios
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.26,
    // shadow on android
    elevation: 8,
    // position: 'absolute',
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 10,
    height: 80,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    width: '100%',
  },
});

const NavBar = (props) => (
  // allows you to add other styles from outside this component
  <View style={{ ...styles.navbar, ...props.style }}>{props.children}</View>
);

export default NavBar;
