/* eslint-disable array-callback-return */
import React, { useReducer } from 'react';

const SET_AUTH = 'SET_AUTH';
// const SET_USERID = 'SET_USERID';
const ADD_IMAGE = 'ADD_IMAGE';
const ADD_PHRASE = 'ADD_PHRASE';
const SET_IMAGES = 'SET_IMAGES';
const SET_PHRASES = 'SET_PHRASES';
const SET_CATEGORIES = 'SET_CATEGORIES';
const SELECT_CATEGORY = 'SELECT_CATEGORY';
const SET_CHINESE = 'SET_CHINESE';
const SET_FILE = 'SET_FILE';
const SET_SPEECH_SPEED = 'SET_SPEECH_SPEED';
const SET_SPEECH_PITCH = 'SET_SPEECH_PITCH';
const SET_NEW_CATEGORY_NAME = 'SET_NEW_CATEGORY_NAME';
const REMOVE_PHRASE = 'REMOVE_PHRASE';
const ADD_CATEGORY_TO_PHRASE = 'ADD_CATEGORY_TO_PHRASE';
const REMOVE_CATEGORY_FROM_PHRASE = 'REMOVE_CATEGORY_FROM_PHRASE';

const initialState = {
  auth: false,
  userId: null,
  images: [],
  phrases: [],
  chinese: [],
  file: null,
  speechSpeed: 1,
  speechPitch: 1,
  categories: [],
  selectedCategory: 'All Phrases',
  newCategoryName: null,
};

const pinyintirReducer = (state, action) => {
  switch (action.type) {
    case SET_AUTH:
      return { ...state, auth: action.payload.auth };
    case ADD_IMAGE:
      return { ...state, images: [...state.images, action.payload.imgObj] };
    case ADD_PHRASE:
      return { ...state, phrases: [...state.phrases, action.payload.phraseObj] };
    case REMOVE_PHRASE:
      return {
        ...state,
        phrases: [...state.phrases.filter((phrase) => phrase._id !== action.payload.phraseId)],
      };
    case SET_IMAGES:
      return { ...state, images: action.payload.images };
    case SET_PHRASES:
      return { ...state, phrases: action.payload.phrases };
    case SET_CATEGORIES:
      return { ...state, categories: action.payload.cats };
    case SELECT_CATEGORY:
      return { ...state, selectedCategory: action.payload.catName };
    case SET_CHINESE:
      return { ...state, chinese: action.payload.chinese };
    case SET_FILE:
      return { ...state, file: action.payload.file };
    case SET_SPEECH_SPEED:
      return { ...state, speechSpeed: action.payload.speed };
    case SET_SPEECH_PITCH:
      return { ...state, speechPitch: action.payload.pitch };
    case SET_NEW_CATEGORY_NAME:
      return { ...state, newCategoryName: action.payload.newCategoryName };
    case ADD_CATEGORY_TO_PHRASE:
      state.phrases.map((phrase) => {
        if (phrase.id === action.payload.phraseId) {
          phrase.category.push(action.payload.newCategory);
        } });
      return { ...state, phrases: [...state.phrases] };
    case REMOVE_CATEGORY_FROM_PHRASE:
      state.phrases.map((phrase) => {
        if (phrase.id === action.payload.phraseId) {
          phrase.category.filter((cat) => cat !== action.payload.category); } });
      return { ...state, phrases: [...state.phrases] };
    default:
      return state;
  }
};

const array = [{ name: 'a', arraySet: [1, 2] }, { name: 'b', arraySet: [1, 2] }];
array.map((obj) => {
  if (obj.name === 'a') {
    obj.arraySet.push(10);
  }
});

export const setAuthAction = (auth) => ({ type: SET_AUTH, payload: { auth } });

export const addImageAction = (imgObj) => ({ type: ADD_IMAGE, payload: { imgObj } });

export const removePhraseAction = (phraseId) => ({
  type: REMOVE_PHRASE,
  payload: { phraseId },
});

export const addPhraseAction = (phraseObj) => ({ type: ADD_PHRASE, payload: { phraseObj } });

export const setImagesAction = (images) => ({ type: SET_IMAGES, payload: { images } });

export const setPhrasesAction = (phrases) => ({ type: SET_PHRASES, payload: { phrases } });

export const setCategoriesAction = (cats) => ({ type: SET_CATEGORIES, payload: { cats } });

export const selectCategoryAction = (catName) => ({ type: SELECT_CATEGORY, payload: { catName } });

export const setNewCategoryNameAction = (newCategoryName) => ({
  type: SET_NEW_CATEGORY_NAME,
  payload: { newCategoryName },
});

export const setChineseAction = (chinese) => ({ type: SET_CHINESE, payload: { chinese } });

export const setFileAction = (file) => ({ type: SET_FILE, payload: { file } });

export const setSpeechSpeedAction = (speed) => ({ type: SET_SPEECH_SPEED, payload: { speed } });

export const setSpeechPitchAction = (pitch) => ({ type: SET_SPEECH_PITCH, payload: { pitch } });

export const addCategoryToPhrase = (newCategory, phraseId) => (
  { type: ADD_CATEGORY_TO_PHRASE, payload: { newCategory, phraseId } }
);

export const removeCategoryFromPhrase = (category, phraseId) => (
  { type: REMOVE_CATEGORY_FROM_PHRASE, payload: { category, phraseId } }
);

/** Initialize useContext */
export const Context = React.createContext(null);
const { Provider } = Context;

export const PinyintirProvider = ({ children }) => {
  const [store, dispatch] = useReducer(pinyintirReducer, initialState);

  return (
    <Provider value={{ store, dispatch }}>
      {children}
    </Provider>
  );
};
