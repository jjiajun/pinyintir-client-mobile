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
import Card from '../components/Card.jsx';
import CustomButton from '../components/CustomButton.jsx';

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    marginVertical: 10,
    color: 'black',
    textAlign: 'center',
  },
  phraseCard: {
    width: 200,
    height: 200,
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
      <Card>
        <CustomButton
          style={styles.button}
          title="Scan"
          color={Colors.primary}
          onPress={() => navigation.navigate('Scan')}
        />
      </Card>
    </View>
  );
};

PhraseGallery.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

export default PhraseGallery;
