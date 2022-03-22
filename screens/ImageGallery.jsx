import React, { useContext, useEffect } from 'react';
import axios from 'axios';
import { REACT_APP_BACKEND } from 'react-native-dotenv';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
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
    width: '100%',
    height: 200,
    margin: 0,
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

  /** Helper function to display all images stored in allImages state */
  return (
    <View style={styles.screen}>
      {images.length > 0
        ? (
          <FlatList
            data={images}
            renderItem={({ item }) => (
              <View style={styles.gallery}>
                <Image
                  style={styles.img}
                  source={{ uri: `${REACT_APP_BACKEND}/image${item.imagePath}` }}
                />
              </View>
            )}
            // Setting the number of column
            numColumns={2}
            keyExtractor={(item, index) => index.toString()}
          />
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
