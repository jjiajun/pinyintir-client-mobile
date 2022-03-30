import React, { useState, useContext } from 'react';
import { REACT_APP_BACKEND } from 'react-native-dotenv';
import {
  ActivityIndicator, Dimensions, View, StyleSheet, TouchableOpacity, Image, Text,
} from 'react-native';
import { ArrowLeftIcon } from 'react-native-heroicons/outline';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { TrashIcon } from 'react-native-heroicons/solid';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import OverlayTextButton from './OverlayTextButton.jsx';
import ModalComponent from './Modal.jsx';
import CustomButton from './CustomButton.jsx';
import Card from './Card.jsx';
import Colors from '../utils/colors.js';

import {
  Context,
  removeImageAction,
} from '../Context.jsx';

const styles = StyleSheet.create({

  button: {
    padding: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    borderRadius: 50,
    borderColor: 'white',
    borderWidth: 1,
    marginBottom: 5,
  },
  buttonContainer: {
    position: 'absolute',
    top: 0,
    padding: 5,
    zIndex: 100,
  },
  img: {
    width: '100%',
    height: '100%',
    margin: 0,
  },
  modalTitle: {
    fontSize: 16,
    marginVertical: 1,
    fontWeight: '900',
    color: 'black',
    textAlign: 'center',
  },
  overlay: {
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    position: 'absolute',
  },
  redButton: {
    backgroundColor: Colors.orangeyRed,
    width: 200,
    margin: 10,
    height: 38,
    marginTop: 16,
  },

});

const OverlayOneImage = ({
  backToGallery, data,
}) => {
  const { dispatch } = useContext(Context);
  // State and setter for signup and login message
  const [loading, setLoading] = useState(false);

  const [deleteImageModalVisible, setDeleteImageModalVisible] = useState(false);

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

  /** call backend api to add current phrase into selected categories */
  const deleteImage = async () => {
    const userId = await AsyncStorage.getItem('@userId');
    const token = await AsyncStorage.getItem('@sessionToken');
    // create authorization header
    const auth = { headers: { Authorization: `Bearer ${token}` } };
    setLoading(true);
    await axios
      .post(
        `${REACT_APP_BACKEND}/image/deleteimage`,
        { userId, imagePath },
        auth,
      );
    dispatch(removeImageAction(imagePath));
    setLoading(false);
    backToGallery();
  };

  return (
    <View style={styles.overlay}>
      {deleteImageModalVisible && (
        <ModalComponent
          modalVisible={deleteImageModalVisible}
          setModalVisible={setDeleteImageModalVisible}
        >
          <Card style={styles.card}>
            <Text style={styles.modalTitle}>Are you sure you want to</Text>
            <Text style={styles.modalTitle}>delete this image?</Text>
            {loading
              ? (<ActivityIndicator animating={loading} size="large" color="#FF9B53" />)
              : (
                <CustomButton
                  style={styles.redButton}
                  title="Delete"
                  onPress={() => {
                    deleteImage();
                    setDeleteImageModalVisible(false);
                  }}
                />
              )}
          </Card>
        </ModalComponent>
      )}
      <Image
        style={styles.img}
        source={{ uri: `${REACT_APP_BACKEND}/image${imagePath}` }}
      />
      <View style={styles.overlay}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={backToGallery}>
            <ArrowLeftIcon color="white" />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              setDeleteImageModalVisible(true);
            }}
          >
            <TrashIcon
              size={24}
              color="white"
            />
          </TouchableOpacity>

        </View>
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

      </View>
    </View>
  );
};
export default OverlayOneImage;
