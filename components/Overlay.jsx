import React from 'react';
import { View, StyleSheet } from 'react-native';
import OverlayTextButton from './OverlayTextButton';

const Overlay = (props) =>(
  <View style={styles.overlay}>
    {props.returnData.map((text)=>(
      <OverlayTextButton pinyin={} chinese={} translation={} styles={{top:0 , left:0}}/>
    ))}
  </View>
)

const styles = StyleSheet.create({
  overlay: {
    height:'100%',
    width:'100%',
    justifyContent: 'center',
    position:'absolute',
  },
});

export default Overlay;