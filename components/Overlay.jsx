import React from 'react';
import { View, StyleSheet } from 'react-native';
import OverlayTextButton from './OverlayTextButton';

const Overlay = (props) => (
  <View style={styles.overlay}>
    {props.returnData.map((text) => (
      <OverlayTextButton
        pinyin={text.pinyin}
        chinese={text.characters}
        translation={text.translation}
        styles={{ top: text.vertices[0].y, left: text.vertices[0].x }}
      />
    ))}
  </View>
);

const styles = StyleSheet.create({
  overlay: {
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    position: 'absolute',
  },
});

export default Overlay;
