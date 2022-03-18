import React from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity,
} from 'react-native';
import * as Speech from 'expo-speech';
import { MicrophoneIcon } from 'react-native-heroicons/outline';

const styles = StyleSheet.create({
  listItem: {
    padding: 10,
    marginVertical: 10,
    backgroundColor: '#ccc',
    borderColor: 'black',
    borderWidth: 1,
  },
  characters: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  chineseText: {
    marginRight: 5,
  },
});

const ChineseCard = ({ item }) => {
  const speakText = (text) => {
    try {
      Speech.speak(text, { language: 'zh-CN' });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <View style={styles.listItem}>
      <View style={styles.characters}>
        <Text style={styles.chineseText}>{item.characters}</Text>
        <TouchableOpacity onPress={() => speakText(item.characters)}>
          <MicrophoneIcon color="black" size={16} fill="black" />
        </TouchableOpacity>
      </View>
      <Text>{item.pinyin}</Text>
      <Text>{item.translation}</Text>
    </View>
  ); };

export default ChineseCard;
