import React, { useContext, useEffect } from 'react';
import axios from 'axios';
import { REACT_APP_BACKEND } from 'react-native-dotenv';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  View, Text, StyleSheet, ScrollView,
} from 'react-native';
import { EmojiSadIcon } from 'react-native-heroicons/outline';
import { Context } from '../Context.js';
import Card from '../components/Card.jsx';

const styles = StyleSheet.create({
  phraseCard: {
    width: 200,
    height: 200,
    margin: 6,
  },
  text: {
    fontSize: 16,
    marginVertical: 10,
    color: 'black',
    textAlign: 'center',
  },
  screen: {
    flex: 1,
  },
  scrollView: {
    display: 'flex',
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

const PhraseGallery = () => {
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
          .post(`${REACT_APP_BACKEND}/user/getuserdatabyid`, { userId }, auth)
          .then((response) => {
            setAllPhrases([...response.data.userProfile.phrases]);
          });
      } catch (err) {
        console.log(err);
      }
    };
    getData().then(() => console.log('getData successful!', allPhrases));
  }, []);

  return (
    <View style={styles.screen}>
      {allPhrases.length > 0 ? (
        <ScrollView>
          <View style={styles.scrollView}>
            {allPhrases.map((onePhrase) => (
              <Card key={onePhrase._id} style={styles.phraseCard}>
                {console.log(onePhrase)}
                <Text style={styles.text}>{onePhrase.chinesePhrase}</Text>
                <Text style={styles.text}>{onePhrase.pinyin}</Text>
                <Text style={styles.text}>{onePhrase.definition}</Text>
              </Card>
            ))}
          </View>
        </ScrollView>
      ) : (
        <View style={styles.messageContainer}>
          <EmojiSadIcon color="black" size={60} />
          <Text style={styles.message}>No phrases!
            You can save your favourite phrases after scanning an image.
          </Text>
        </View>
      )}
    </View>
  );
};

export default PhraseGallery;
