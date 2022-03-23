import React from 'react';
import {
  StyleSheet, TouchableOpacity, Text,
} from 'react-native';
import { XIcon, CheckIcon } from 'react-native-heroicons/outline';

const styles = StyleSheet.create({
  pill: {
    // shadow but only for ios
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.26,
    // shadow on android
    elevation: 8,
    borderRadius: 10,
    margin: 6,
    backgroundColor: 'black',
    paddingHorizontal: 12,
    paddingVertical: 7,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  text: {
    color: 'white',
  },
  iconWhite: {
    color: 'white',
    marginLeft: 5,
  },
  // iconBlack: {
  //   color: 'black',
  //   marginRight: 10,
  // },
});

const Pill = (props) => (
  // using spread operators below lets you add other styles from outside this component
  <TouchableOpacity
    style={{ ...styles.pill, ...props.style }}
    onPress={props.onPress}
  >
    <Text style={styles.text}>{props.title}</Text>
    {props.selected
      ? <XIcon style={styles.iconWhite} size={20} />
      : <CheckIcon style={styles.iconWhite} size={20} />}
  </TouchableOpacity>
);

export default Pill;
