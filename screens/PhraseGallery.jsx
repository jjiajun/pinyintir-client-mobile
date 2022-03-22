import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { REACT_APP_BACKEND } from 'react-native-dotenv';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  View, Text, StyleSheet, ScrollView, Dimensions, Pressable,
} from 'react-native';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
  renderers,
} from 'react-native-popup-menu';
import { ChevronDownIcon } from 'react-native-heroicons/solid';
import { v4 as uuidv4 } from 'uuid';
import { EmojiSadIcon, PlusCircleIcon } from 'react-native-heroicons/outline';
import { LinearGradient } from 'expo-linear-gradient';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import {
  Context, setPhrasesAction, setCategoriesAction, selectCategoryAction, setNewCategoryNameAction, removePhraseAction,
} from '../Context.jsx';
import Card from '../components/Card.jsx';
import Colors from '../constants/colors.js';
import ModalComponent from '../components/Modal.jsx';
import Input from '../components/Input.jsx';
import CustomButton from '../components/CustomButton.jsx';

const styles = StyleSheet.create({
  bold: {
    fontWeight: 'bold',
    // fontSize: 16,
  },
  button: {
    backgroundColor: Colors.primary,
    width: 220,
    height: 38,
  },
  card: {
    padding: 20,
    height: 200,
    width: 280,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  cardContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  circle: {
    height: 26,
    width: 26,
    marginHorizontal: 3,
    borderRadius: 50,
    backgroundColor: Colors.primary,
    marginRight: 14,
  },
  container: {
    flex: 4,
  },
  dropdownTrigger: {
    borderRadius: 8,
    paddingLeft: '7%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    textAlign: 'center',
    marginVertical: 20,
  },
  header: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  modalTitle: {
    fontSize: 16,
    marginVertical: 5,
    fontWeight: '900',
    color: 'black',
    textAlign: 'center',
  },
  iconWhite: {
    color: 'white',
    marginHorizontal: 5,
    marginRight: 10,
  },
  iconBlack: {
    color: 'black',
    marginRight: 10,

  },
  input: {
    height: 40,
    width: 220,
    paddingHorizontal: 15,
    textAlign: 'center',
  },
  italics: {
    fontStyle: 'italic',
  },
  linearGradient: {
    flex: 1,
  },
  phraseCard: {
    width: '88%',
    margin: 8,
    borderRadius: 8,
  },
  message: {
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'white',
  },
  messageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  options: {
    backgroundColor: 'white',
    height: 50,
    paddingHorizontal: 20,
    display: 'flex',
    flexDirection: 'row',
  },
  optionsContainer: {
    marginTop: 48,
    borderRadius: 20,
    paddingTop: 20,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    textAlign: 'center',
  },
  screen: {
    flex: 1,
  },
  text: {
    fontSize: 14,
    marginVertical: 5,
    color: 'black',
  },
});

const PhraseGallery = () => {
  const { store, dispatch } = useContext(Context);
  const { newCategoryName } = store;
  const {
    phrases, categories, selectedCategory,
  } = store;
  const [newCatModalVisible, setNewCatModalVisible] = useState(false);
  const [phraseModalVisible, setPhraseModalVisible] = useState(false);
  let userId;
  let token;
  let auth;
  const navBarHeight = useBottomTabBarHeight();

  const windowWidth = Number(Dimensions.get('window').width);
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

  /** call backend api to add current phrase into selected categories */
  const deletePhrase = (userId, phraseId) => {
    axios
      .post(`${REACT_APP_BACKEND}/phrase/deletephrase`, { userId, phraseId }, auth)
      .then(() => {
        dispatch(removePhraseAction(phraseId));
      });
  };

  const sortIntoCategories = () => {

  };

  return (

    <View style={styles.screen}>
      <LinearGradient
        colors={[Colors.primary, Colors.orangeyRed]}
        style={styles.linearGradient}
        start={{ x: 0.9, y: 0.1 }}
        end={{ x: 0.1, y: 0.5 }}
      >
        {newCatModalVisible && (
        <ModalComponent
          modalVisible={newCatModalVisible}
          setModalVisible={setNewCatModalVisible}
        >
          <Card style={styles.card}>
            <Text style={styles.modalTitle}>New category</Text>
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
        </ModalComponent>
        )}
        {phraseModalVisible && (
        <ModalComponent
          modalVisible={phraseModalVisible}
          setModalVisible={setPhraseModalVisible}
          submitFunction={{ deletePhrase, sortIntoCategories }}
          userId={userId}
        />
        )}
        <Menu
          renderer={renderers.SlideInMenu}
        >
          <MenuTrigger style={styles.dropdownTrigger}>
            <Text style={styles.header}>{selectedCategory}</Text>
            <ChevronDownIcon style={styles.iconWhite} size={28} />
          </MenuTrigger>
          <MenuOptions optionsContainerStyle={
            {
              ...styles.optionsContainer,
              width: windowWidth,
              paddingBottom: navBarHeight,
            }
          }
          >
            {categories.map((oneCategory) => (
              <MenuOption
                key={oneCategory._id}
                style={{ ...styles.options, width: windowWidth }}
                onSelect={() => dispatch(selectCategoryAction(oneCategory.name))}
              >
                <View style={styles.circle} />
                <Text style={[styles.text, styles.bold]}>{oneCategory.name}</Text>
              </MenuOption>
            ))}
            <MenuOption
              style={{ ...styles.options, width: windowWidth }}
              onSelect={() => setNewCatModalVisible(!newCatModalVisible)}
            >
              <PlusCircleIcon style={styles.iconBlack} size={32} />
              <Text style={[styles.text, styles.bold]}>
                Create new category
              </Text>
            </MenuOption>
          </MenuOptions>
        </Menu>
        <View style={styles.container}>
          {phrases.length > 0 ? (
            <ScrollView>
              <View style={styles.cardContainer}>
                {phrases
                  .filter((onePhrase) => onePhrase.category.includes(selectedCategory))
                  .map((onePhrase) => (

                    <Card key={onePhrase._id} style={styles.phraseCard}>
                      <Pressable
                        onLongPress={() => setPhraseModalVisible(true)}
                      >
                        <Text style={[
                          styles.text,
                          styles.bold,
                          { fontSize: 16 }]}
                        >{onePhrase.chinesePhrase}
                        </Text>
                        <Text style={[styles.text, styles.italics]}>{onePhrase.pinyin}</Text>
                        <Text style={styles.text}>{onePhrase.definition}</Text>
                      </Pressable>
                    </Card>
                  ))}
              </View>
            </ScrollView>
          ) : (
            <View style={styles.messageContainer}>
              <EmojiSadIcon style={styles.iconWhite} size={60} />
              <Text style={styles.message}>No phrases!
                You can save your favourite phrases after scanning an image.
              </Text>
            </View>
          )}
        </View>
      </LinearGradient>

    </View>
  );
};

export default PhraseGallery;
