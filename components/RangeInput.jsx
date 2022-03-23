import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Slider from '@react-native-community/slider';
import Colors from '../utils/colors.js';

const styles = StyleSheet.create({
  sliderContainer: {
    width: '80%',
    alignItems: 'center',
    marginBottom: 20,
  },
});

const RangeInput = ({ label, value, handleChange }) => (
  <View style={styles.sliderContainer}>
    <Text>{label}</Text>
    <Slider
      style={{ width: '100%', height: 40 }}
      minimumValue={0.1}
      maximumValue={2}
      step={0.1}
      minimumTrackTintColor={Colors.primary}
      maximumTrackTintColor="#000000"
      value={value}
      onValueChange={handleChange}
    />
    <Text>{value.toFixed(1)}</Text>
  </View>
);

export default RangeInput;
