import React, { useContext } from 'react';
import axios from 'axios';
import { REACT_APP_BACKEND } from 'react-native-dotenv';
import {
  Dimensions, View, StyleSheet, TouchableOpacity,
} from 'react-native';
import { ArrowLeftIcon, DocumentTextIcon, BookmarkIcon } from 'react-native-heroicons/outline';
import AsyncStorage from '@react-native-async-storage/async-storage';
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

});

const Overlay = ({
  dimension, continueVideo, toggleOverlay, saveScreenshot, loading, setLoading, setMsg,
}) => {
  let heightRatio = 1;
  let widthRatio = 1;
  const overlayTextVerticalOffset = 0;
  const navBarHeight = useBottomTabBarHeight();
  if (dimension.height) {
    heightRatio = (Number(Dimensions.get('window').height) - navBarHeight) / Number(dimension.height);
    console.log('dimension get window height', Number(dimension.height));
    widthRatio = Number(Dimensions.get('window').width) / Number(dimension.width);
  }

  const { store, dispatch } = useContext(Context);
  const { chinese, auth } = store;

  /** Submit function to upload image to db + aws */
  const savePhrase = async (dataObject) => {
    try {
      setLoading(true);
      const userId = await AsyncStorage.getItem('@userId');
      const token = await AsyncStorage.getItem('@sessionToken');
      const authHeader = { headers: { Authorization: `Bearer ${token}` } };

      const { characters, pinyin, translation } = dataObject;
      const data = {
        chinesePhrase: characters, pinyin, definition: translation, userId,
      };
      await axios.post(`${REACT_APP_BACKEND}/phrase/uploadphrase`, data, authHeader);
      setLoading(false);
      setMsg('Save successful!');
      setTimeout(() => {
        setMsg('');
      }, 3000);
      dispatch(addPhraseAction(
        {
          id: uuidv4(),
          chinesePhrase: characters,
          pinyin,
          definition: translation,
          category: ['All Phrases'],
        },
      ));
      // Adds newly image data to allImages state.
      // I am updating the allImages state on the FE so that the update is instantaneous.
      // The BE is also updated. When the page is reloaded, the image list will still be the latest.
    } catch (err) {
      console.log(err);
      setLoading(false);
      setMsg('An error occured, please try again');
      setTimeout(() => {
        setMsg('');
      }, 3000);
    }
  };

  return (
    <View style={styles.overlay}>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={continueVideo}>
          <ArrowLeftIcon color="white" />
        </TouchableOpacity>
        {auth && (
          <TouchableOpacity
            style={styles.button}
            onPress={saveScreenshot}
          >
            <BookmarkIcon color="white" />
          </TouchableOpacity>
        )}
        <TouchableOpacity
          style={styles.button}
          onPress={() => toggleOverlay((prev) => !prev)}
        >
          <DocumentTextIcon color="white" />
        </TouchableOpacity>
      </View>
      {chinese.map((text) => (
        <OverlayTextButton
          key={text.id}
          pinyin={text.pinyin}
          chinese={text.characters}
          translation={text.translation}
          text={text}
          savePhrase={savePhrase}
          styles={{
            top: text.vertices[0].y * heightRatio - overlayTextVerticalOffset,
            left: text.vertices[0].x * widthRatio,
          }}
        />
      ))}

    </View>
  );
};
export default Overlay;
