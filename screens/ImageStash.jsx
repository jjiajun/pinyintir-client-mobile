import React, { useState, useContext, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import axios from 'axios';
import { REACT_APP_BACKEND } from 'react-native-dotenv';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import { Context } from '../Context.js';

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    marginVertical: 10,
    color: 'black',
    textAlign: 'center',
  },
  img: {
    width: 100,
    height: 100,
  },
});

const ImageStash = ({ navigation }) => {
  const { allImages, setAllImages } = useContext(Context);
  let displayImages;
  let userId;
  let token;

  /** To get userId and token for axios calls at every render */
  useEffect(() => {
    const getData = async () => {
      try {
        userId = await AsyncStorage.getItem('@userId');
        token = await AsyncStorage.getItem('@sessionToken');
        console.log('USERID: ', userId);
        console.log('TOKEN: ', token);
      } catch (err) {
        console.log(err);
      }
    };
    getData();
    // create authorization header
    auth = { headers: { Authorization: `Bearer ${token}` } };
  });

  /** Get all the images by userId. Only triggered when page first loads */
  useEffect(() => {
    axios
      .post(`${REACT_APP_BACKEND}/getuserdatabyid`, { userId }, auth)
      .then((response) => {
        console.log(response);
        setAllImages([...response.data.userProfile.images]);
        // setState is async. The only way to check the allImages value after setState has completed is to use useEffect (runs after the page has re-rendered)!
      });
  }, []);

  /** Helper function to display all images stored in allImages state */
  if (allImages) {
    return (
      <FlatList
        data={allImages}
        keyExtractor={(item) => item.id}
        renderItem={(oneImageData) => (
          <View>
            <Text style={styles.text}>{oneImageData.description}</Text>
            <Image
              style={styles.image}
              source={{ uri: `${REACT_APP_BACKEND}${oneImageData.imagePath}` }}
            />
          </View>
        )}
      />
    );
  }

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss;
      }}
    >
      <View style={styles.screen}>
        <Text style={styles.title}>Your screenshots</Text>
        <View>{displayImages || <Text>No images</Text>}</View>
        <StatusBar style="auto" />
      </View>
    </TouchableWithoutFeedback>
  );
};

export default ImageStash;
