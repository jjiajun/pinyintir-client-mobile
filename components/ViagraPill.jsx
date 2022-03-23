import React, { useState } from 'react';
import {
  StyleSheet, TouchableOpacity, Text,
} from 'react-native';
import { XIcon, CheckIcon } from 'react-native-heroicons/outline';
import Colors from '../utils/colors.js';

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
    backgroundColor: '#949494',
    paddingHorizontal: 15,
    paddingVertical: 7,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  text: {
    color: 'white',
    // backgroundColor: 'transparent',
  },
  iconWhite: {
    color: 'white',
    marginLeft: 5,
    // backgroundColor: 'transparent',
  },
});

const Pill = (props) => {
  // check if selected phrase is already in this category (true / false)
  const isCategoryInUse = props.categories.includes(props.title);
  const [selected, setSelected] = useState(isCategoryInUse);

  return (
  // using spread operators below lets you add other styles from outside this component
    <TouchableOpacity
      style={[styles.pill, props.style, selected ? { backgroundColor: Colors.primary } : { backgroundColor: '#949494' }]}
      onPress={() => {
        // if !selected, call /addcategorytophrase : call /removecategoryfromphrase
        setSelected(!selected);
      }}
    >
      <Text style={styles.text}>{props.title}</Text>
      {selected
        ? <XIcon style={styles.iconWhite} size={20} />
        : <CheckIcon style={styles.iconWhite} size={20} />}
    </TouchableOpacity>
  );
};

export default Pill;
