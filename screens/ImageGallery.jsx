import React, { useContext, useEffect } from 'react';
import axios from 'axios';
import { REACT_APP_BACKEND } from 'react-native-dotenv';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
} from 'react-native';
import { EmojiSadIcon } from 'react-native-heroicons/outline';
import { Context, setImagesAction } from '../Context.jsx';

const styles = StyleSheet.create({
  button: {
    padding: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    borderRadius: 50,
    borderColor: 'white',
    borderWidth: 1,
    marginBottom: 5,
  },
  gallery: {
    flex: 1,
  },
  img: {
    width: 200,
    height: 200,
  },
  screen: {
    flex: 1,
  },
  text: {
    fontSize: 20,
    marginVertical: 10,
    color: 'black',
    textAlign: 'center',
  },
  messageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  message: {
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

const ImageGallery = () => {
  const { store, dispatch } = useContext(Context);
  const { images } = store;
  let userId;
  let token;
  let auth;

  /** To get userId and token for axios calls at every render */
  useEffect(() => {
    const getData = async () => {
      try {
        userId = await AsyncStorage.getItem('@userId');
        token = await AsyncStorage.getItem('@sessionToken');
        // create authorization header
        auth = { headers: { Authorization: `Bearer ${token}` } };
        const response = await axios.post(`${REACT_APP_BACKEND}/user/getuserdatabyid`, { userId }, auth);
        console.log('response: ', response);
        dispatch(setImagesAction([...response.data.userProfile.images]));
      } catch (err) {
        console.log(err);
      }
    };
    getData().then(() => console.log('getData successful!', images));
  }, []);

  console.log('allimages: ', images);

  /** Helper function to display all images stored in allImages state */
  return (
    <View style={styles.screen}>
<<<<<<< HEAD
      {allImages.length > 0
=======
      {images.length > 0
>>>>>>> f0d15115408a86d2edb7504fd596b61fff162cb3
        ? (
          <ScrollView>
            {images.map((oneImage) => (
              <View key={oneImage._id} style={styles.gallery}>
                <Image
                  style={styles.img}
                  source={{ uri: `${REACT_APP_BACKEND}/image${oneImage.imagePath}` }}
                />
              </View>
            ))}
          </ScrollView>
        )
        : (
          <View style={styles.messageContainer}>
            <EmojiSadIcon color="black" size={60} />
            <Text style={styles.message}>No images!
              You can save your favourite images after scanning an image.
            </Text>
          </View>
        )}
    </View>
  );
};

export default ImageGallery;
