import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { REACT_APP_BACKEND } from 'react-native-dotenv';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  View, Text, StyleSheet, ScrollView, Dimensions, Modal, Pressable,
} from 'react-native';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';
import { ChevronDownIcon } from 'react-native-heroicons/solid';
import { v4 as uuidv4 } from 'uuid';
import { EmojiSadIcon } from 'react-native-heroicons/outline';
import {
  Context, setPhrasesAction, setCategoriesAction, selectCategoryAction, setNewCategoryNameAction,
} from '../Context.jsx';
import Card from '../components/Card.jsx';
import Colors from '../constants/colors.js';
import Input from '../components/Input.jsx';
import CustomButton from '../components/CustomButton.jsx';

const styles = StyleSheet.create({
  phraseCard: {
    width: 200,
    height: 200,
    margin: 6,
  },
  text: {
    fontSize: 14,
    marginVertical: 5,
    color: 'black',
    textAlign: 'center',
  },
  header: {
    fontSize: 16,
    marginVertical: 5,
    fontWeight: '900',
    color: 'black',
    textAlign: 'center',
  },
  screen: {
    flex: 1,
  },
  card: {
    padding: 20,
    height: 220,
    width: 260,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  container: {
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
    backgroundColor: Colors.primary,
    width: 170,
    height: 38,
  },
  menu: {
    marginHorizontal: 60,
    margin: 20,
  },
  options: {
    backgroundColor: 'transparent',
    textAlign: 'center',
  },
  optionsContainer: {
    marginTop: 48,
    borderRadius: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
  },
  dropdownTrigger: {
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 10,
    paddingHorizontal: 20,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    textAlign: 'center',
    // shadow but only for ios
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.26,
    // shadow on android
    elevation: 8,
  },
  icon: {
    color: 'black',
  },
  input: {
    height: 40,
    width: 175,
  },
  modal: {
    color: 'white',
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
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
  const { store, dispatch } = useContext(Context);
  const {
    phrases, categories, selectedCategory, newCategoryName,
  } = store;
  const [modalVisible, setModalVisible] = useState(false);
  let userId;
  let token;
  let auth;

  const windowWidth = Number(Dimensions.get('window').width);
  const optionWidth = windowWidth - 120;
  /** To get userId and token for axios calls at every render */
  useEffect(() => {
    const getData = async () => {
      try {
        // setUserId(await AsyncStorage.getItem('@userId'));
        userId = await AsyncStorage.getItem('@userId');
        token = await AsyncStorage.getItem('@sessionToken');
        // create authorization header
        auth = { headers: { Authorization: `Bearer ${token}` } };
        const response = await axios.post(`${REACT_APP_BACKEND}/user/getuserdatabyid`, { userId }, auth);
        dispatch(setPhrasesAction([...response.data.userProfile.phrases]));
        dispatch(setCategoriesAction([...response.data.userProfile.categories]));
      } catch (err) {
        console.log(err);
      }
    };
    getData().then(() => console.log('getData successful!'));
  }, []);

  /** call backend api to create new category by userId */
  const createNewCategory = (newCategory, userId) => {
    axios
      .post(`${REACT_APP_BACKEND}/phrase/addnewcategory`, { userId, newCategory }, auth)
      .then((response) => {
        console.log(response.data);
        dispatch(setCategoriesAction([...categories, {
          id: uuidv4(),
          name: newCategory,
        }]));
      });
  };

  return (

    <View style={styles.screen}>
      <View style={styles.modal}>

        <Modal
          animationType="fade"
          transparent
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <Pressable
            onPress={() => setModalVisible(false)}
            style={[styles.modal, modalVisible ? { backgroundColor: 'rgba(0, 0, 0, 0.4)' } : '']}
          >
            <Pressable
              onPress={() => setModalVisible(true)}
            >
              <Card style={styles.card}>
                <Text style={styles.header}>Create new category</Text>
                <Input
                  placeholder="Category name"
                  onChangeText={(el) => dispatch(setNewCategoryNameAction(el))}
                  style={styles.input}
                />
                <CustomButton
                  style={styles.button}
                  title="Create"
                  onPress={() => createNewCategory(newCategoryName, userId)}
                />
              </Card>
            </Pressable>
          </Pressable>
        </Modal>
      </View>
      <Menu style={styles.menu}>
        <MenuTrigger style={styles.dropdownTrigger}>
          <Text>{selectedCategory}</Text>
          <ChevronDownIcon style={styles.icon} />
        </MenuTrigger>
        <MenuOptions optionsContainerStyle={{ ...styles.optionsContainer, width: optionWidth }}>
          {categories.map((oneCategory) => (
            <MenuOption
              key={oneCategory._id}
              style={{ ...styles.options, width: optionWidth }}
              onSelect={() => dispatch(selectCategoryAction(oneCategory.name))}
            >
              <Text style={styles.text}>{oneCategory.name}</Text>
            </MenuOption>
          ))}
          <MenuOption
            style={{ ...styles.options, width: optionWidth }}
            onSelect={() => setModalVisible(!modalVisible)}
          >
            <Text style={styles.text}>
              Create new category
            </Text>
          </MenuOption>
        </MenuOptions>
      </Menu>
      <View style={styles.container}>
        {phrases.length > 0 ? (
          <ScrollView>
            <View style={styles.scrollView}>
              {phrases
                .filter((onePhrase) => onePhrase.category === selectedCategory)
                .map((onePhrase) => (
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
    </View>
  );
};

export default PhraseGallery;
