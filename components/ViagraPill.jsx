import React, { useState, useContext, useEffect } from 'react';
import {
  StyleSheet, TouchableOpacity, Text,
} from 'react-native';
import { XIcon, CheckIcon } from 'react-native-heroicons/outline';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { REACT_APP_BACKEND } from 'react-native-dotenv';
import Colors from '../utils/colors.js';
import {
  Context,
  addCategoryToPhrase,
  removeCategoryFromPhrase,
} from '../Context.jsx';

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
    marginVertical: 6,
    backgroundColor: '#949494',
    paddingHorizontal: 16,
    paddingVertical: 7,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    height: 38,
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
  const {
    title, selectedPhrase, setSelectedPhrase, selectedBool,
  } = props;
  const { dispatch } = useContext(Context);
  const [selected, setSelected] = useState(selectedBool);

  // useEffect(() => {
  //   const isCategoryInUse = selectedPhrase.category?.includes(title) ?? false;
  //   // if (selectedPhrase.category) {
  //   //   const isCategoryInUse = selectedPhrase.category.includes(title);
  //   setSelected(isCategoryInUse);
  //   // }
  //   console.log('USEEFFECT RUNS', 'selected: ', selected);
  // }, []);

  const toggleCategory = async () => {
    const userId = await AsyncStorage.getItem('@userId');
    const token = await AsyncStorage.getItem('@sessionToken');
    // create authorization header
    const auth = { headers: { Authorization: `Bearer ${token}` } };
    // setSelected(!selected);
    let onePhraseObj;
    if (selected) {
      // dispatch(removeCategoryFromPhrase(title, selectedPhrase._id));
      onePhraseObj = await axios
        .post(`${REACT_APP_BACKEND}/phrase/removecategoryfromphrase`, { userId, category: title, phraseId: selectedPhrase._id }, auth);
    } else {
      // dispatch(addCategoryToPhrase(title, selectedPhrase._id));
      onePhraseObj = await axios
        .post(`${REACT_APP_BACKEND}/phrase/addcategorytophrase`, { userId, newCategory: title, phraseId: selectedPhrase._id }, auth);
    }
    setSelectedPhrase(onePhraseObj.data);
  };

  return (
  // using spread operators below lets you add other styles from outside this component
    <TouchableOpacity
      style={[styles.pill, selected ? { backgroundColor: Colors.primary } : { backgroundColor: '#949494' }]}
      onPress={() => { toggleCategory(); }}
    >
      <Text style={styles.text}>{title}</Text>
      {selected
        ? <XIcon style={styles.iconWhite} size={16} />
        : <CheckIcon style={styles.iconWhite} size={16} />}
    </TouchableOpacity>
  );
};

export default Pill;
