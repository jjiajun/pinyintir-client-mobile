import React, { useContext, useEffect } from 'react';
import axios from 'axios';
import { REACT_APP_BACKEND } from 'react-native-dotenv';
import PropTypes from 'prop-types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
} from 'react-native';
import { Context } from '../Context.js';
import Colors from '../constants/colors.js';
import NavBar from '../components/NavBar.jsx';
import CustomButton from '../components/CustomButton.jsx';

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
});

const ImageGallery = ({ navigation }) => {
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
          .post(`${REACT_APP_BACKEND}/getuserdatabyid`, { userId }, auth)
          .then((response) => {
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
      {allImages
        ? (
          <ScrollView>
            {allImages.map((oneImage) => (
              <View key={oneImage._id} style={styles.gallery}>
                <Image
                  style={styles.img}
                  source={{ uri: `${REACT_APP_BACKEND}${oneImage.imagePath}` }}
                />
              </View>
            ))}
          </ScrollView>
        )
        : (
          <View style={styles.gallery}>
            <Text>No images</Text>
          </View>
        )}
      <NavBar>
        <CustomButton
          style={styles.button}
          title="Scan"
          color={Colors.primary}
          onPress={() => navigation.navigate('Scan')}
        />
        <CustomButton
          style={styles.button}
          title="Phrase Gallery"
          color={Colors.primary}
          onPress={() => navigation.navigate('PhraseGallery')}
        />
      </NavBar>
    </View>
  );
};
ImageGallery.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

export default ImageGallery;
