import React from 'react';
import {
  Dimensions, Text, View, StyleSheet,
} from 'react-native';
import { MenuProvider } from 'react-native-popup-menu';
import OverlayTextButton from './OverlayTextButton';

const styles = StyleSheet.create({
  overlay: {
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    position: 'absolute',
    backgroundColor: 'blue',
  },
});
const Overlay = (props) => {
  let heightRatio = 1;
  let widthRatio = 1;
  if (props.dimension.height) {
    heightRatio = Number(Dimensions.get('window').height) / Number(props.dimension.height);
    widthRatio = Number(Dimensions.get('window').width) / Number(props.dimension.width);
  }
  console.log('pic', props.dimension.height, 'screen', Dimensions.get('window').height);
  console.log('heightRatio', heightRatio, 'widthRatio', widthRatio);
  return (
    <View style={{
      height: '100%',
      width: '100%',
      justifyContent: 'center',
      position: 'absolute',
    }}
    >

      <MenuProvider>
        {props.returnData.map((text) => (
          <OverlayTextButton
            pinyin={text.pinyin}
            chinese={text.characters}
            translation={text.translation}
            text={text}
            styles={{
              top: text.vertices[0].y * heightRatio,
              left: text.vertices[0].x * widthRatio,
            }}
          />
        ))}
      </MenuProvider>
    </View>
  );
};
export default Overlay;
