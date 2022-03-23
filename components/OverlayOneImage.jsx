import React, { useContext } from 'react';
import axios from 'axios';
import { REACT_APP_BACKEND } from 'react-native-dotenv';
import {
  Dimensions, View, StyleSheet, TouchableOpacity, Image,
} from 'react-native';
import { ArrowLeftIcon, DocumentTextIcon, BookmarkIcon } from 'react-native-heroicons/outline';
import { MenuProvider } from 'react-native-popup-menu';
import { v4 as uuidv4 } from 'uuid';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import OverlayTextButton from './OverlayTextButton.jsx';
import { Context, addPhraseAction } from '../Context.jsx';

const styles = StyleSheet.create({
  overlay: {
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    position: 'absolute',
  },
  buttonContainer: {
    position: 'absolute',
    top: 0,
    padding: 5,
    zIndex: 100,
  },
  button: {
    padding: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    borderRadius: 50,
    borderColor: 'white',
    borderWidth: 1,
    marginBottom: 5,
  },
  img: {
    width: '100%',
    height: '100%',
    margin: 0,
  },

});

const OverlayOneImage = ({
  backToGallery, data,
}) => {
  const chinese = data.data;
  const dimension = data.dims;
  const imagePath = data.imgPath;
  let heightRatio = 1;
  let widthRatio = 1;
  const overlayTextVerticalOffset = 0;
  const navBarHeight = useBottomTabBarHeight();
  if (dimension.height) {
    heightRatio = (Number(Dimensions.get('window').height) - navBarHeight) / Number(dimension.height);
    console.log('dimension get window height', Number(dimension.height));
    widthRatio = Number(Dimensions.get('window').width) / Number(dimension.width);
  }

  return (
    <View style={styles.overlay}>
      <Image
        style={styles.img}
        source={{ uri: `${REACT_APP_BACKEND}/image${imagePath}` }}
      />
      <View style={styles.overlay}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={backToGallery}>
            <ArrowLeftIcon color="white" />
          </TouchableOpacity>
        </View>
        <MenuProvider>
          {chinese.map((text) => (
            <OverlayTextButton
              key={text.id}
              pinyin={text.pinyin}
              chinese={text.characters}
              translation={text.translation}
              text={text}
              styles={{
                top: text.vertices[0].y * heightRatio - overlayTextVerticalOffset,
                left: text.vertices[0].x * widthRatio,
              }}
            />
          ))}
        </MenuProvider>
      </View>
    </View>
  );
};
export default OverlayOneImage;
