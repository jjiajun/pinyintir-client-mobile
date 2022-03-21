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
import { Context } from '../Context.js';

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
  const { allImages, setAllImages } = useContext(Context);
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
        axios
          .post(`${REACT_APP_BACKEND}/user/getuserdatabyid`, { userId }, auth)
          .then((response) => {
            console.log('response: ', response);
            setAllImages([...response.data.userProfile.images]);
          });
      } catch (err) {
        console.log(err);
      }
    };
    getData().then(() => console.log('getData successful!', allImages));
  }, []);

  console.log('allimages: ', allImages);

  /** Helper function to display all images stored in allImages state */
  return (
    <View style={styles.screen}>
      {allImages.length > 0
        ? (
          <ScrollView>
            {allImages.map((oneImage) => (
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
