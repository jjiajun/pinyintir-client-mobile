import React, { useContext } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity,
} from 'react-native';
import { MicrophoneIcon } from 'react-native-heroicons/outline';
import colors from '../utils/colors.js';
import speakText from '../utils/textToSpeech.js';
import { Context } from '../Context.jsx';

const styles = StyleSheet.create({
  listItem: {
    padding: 10,
    backgroundColor: colors.primary,
    color: 'white',
  },
  characters: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  chineseText: {
    marginRight: 5,
    color: 'white',
    marginBottom: 10,
  },
});

const ChineseCard = ({ item }) => {
  const { store } = useContext(Context);
  const { speechSpeed, speechPitch } = store;

  return (
    <View style={styles.listItem}>
      <View style={styles.characters}>
        <Text style={styles.chineseText}>{item.characters}</Text>
        <TouchableOpacity onPress={() => speakText(item.characters, speechSpeed, speechPitch)}>
          <MicrophoneIcon color="white" size={16} fill="white" />
        </TouchableOpacity>
      </View>
      <Text style={styles.chineseText}>{item.pinyin}</Text>
      <Text style={styles.chineseText}>{item.translation}</Text>
    </View>
  ); };

export default ChineseCard;
