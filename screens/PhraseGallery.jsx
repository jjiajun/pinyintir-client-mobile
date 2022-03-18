import React, { useContext, useEffect } from 'react';
import axios from 'axios';
import { REACT_APP_BACKEND } from 'react-native-dotenv';
import PropTypes from 'prop-types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { Context } from '../Context.js';
import Colors from '../constants/colors.js';
import NavBar from '../components/NavBar.jsx';
import CustomButton from '../components/CustomButton.jsx';

const styles = StyleSheet.create({
  phraseCard: {
    width: 200,
    height: 200,
  },
  text: {
    fontSize: 20,
    marginVertical: 10,
    color: 'black',
    textAlign: 'center',
  },
  screen: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  img: {
    width: 200,
    height: 200,
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

const PhraseGallery = ({ navigation }) => {
  const { allPhrases, setAllPhrases } = useContext(Context);
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
            setAllPhrases([...response.data.userProfile.phrases]);
          });
      } catch (err) {
        console.log(err);
      }
    };
    getData().then(() => console.log('getData successful!', allPhrases));
  }, []);

  /** Helper function to display all images stored in allImages state */
  return (
    <View style={styles.screen}>
      {allPhrases
        ? (
          <ScrollView>
            {allPhrases.map((onePhrase) => (
              <View key={onePhrase.id}>
                <Text style={styles.text}>onePhrase.chinesePhrase</Text>
                <Text style={styles.text}>onePhrase.pinyin</Text>
                <Text style={styles.text}>onePhrase.definition</Text>
              </View>
            ))}
          </ScrollView>
        )
        : <View><Text>No phrases</Text></View>}
      <NavBar>
        <CustomButton
          style={styles.button}
          title="Scan"
          color={Colors.primary}
          onPress={() => navigation.navigate('Scan')}
        />
        <CustomButton
          style={styles.button}
          title="Image Gallery"
          color={Colors.primary}
          onPress={() => navigation.navigate('ImageGallery')}
        />
      </NavBar>
    </View>
  );
};

PhraseGallery.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

export default PhraseGallery;
