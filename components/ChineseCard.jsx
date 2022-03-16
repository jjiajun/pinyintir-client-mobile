import React from "react";
import { View, Text, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  listItem: {
    padding: 10,
    marginVertical: 10,
    backgroundColor: "#ccc",
    borderColor: "black",
    borderWidth: 1,
  },
});

const ChineseCard = ({ item }) => (
  <View style={styles.listItem}>
    <Text>{item.characters}</Text>
    <Text>{item.pinyin}</Text>
    <Text>{item.translation}</Text>
  </View>
);

export default ChineseCard;
