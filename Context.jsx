import React, { useReducer } from 'react';

const ADD_IMAGE = 'ADD_IMAGE';
const ADD_PHRASE = 'ADD_PHRASE';
const SET_IMAGES = 'SET_IMAGES';
const SET_PHRASES = 'SET_PHRASES';
const SET_CHINESE = 'SET_CHINESE';
const SET_FILE = 'SET_FILE';
const SET_SPEECH_SPEED = 'SET_SPEECH_SPEED';
const SET_SPEECH_PITCH = 'SET_SPEECH_PITCH';

const initialState = {
  images: [],
  phrases: [],
  chinese: [],
  file: null,
  speechSpeed: 1,
  speechPitch: 1,
  categories: [],
  selectedCategory: 'Saved Phrases',
  newCategoryName: null
};

const pinyintirReducer = (state, action) => {
  switch (action.type) {
    case ADD_IMAGE:
      return { ...state, images: [...state.images, action.payload.imgObj] };
    case ADD_PHRASE:
      return { ...state, phrases: [...state.phrases, action.payload.phraseObj] };
    case SET_IMAGES:
      return { ...state, images: action.payload.images };
    case SET_PHRASES:
      return { ...state, phrases: action.payload.phrases };
    case SET_CATEGORIES:
      return { ...state, categories: action.payload.categories };
    case SELECT_CATEGORY:
      return { ...state, selectedCategory: action.payload.categoryName };
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
    default:
      return state;
  }
};

export const addImageAction = (imgObj) => ({
  type: ADD_IMAGE,
  payload: { imgObj },
});

export const addPhraseAction = (phraseObj) => ({
  type: ADD_PHRASE,
  payload: { phraseObj },
});

export const setImagesAction = (images) => ({
  type: SET_IMAGES,
  payload: { images },
});

export const setPhrasesAction = (phrases) => ({
  type: SET_PHRASES,
  payload: { phrases },
});

export const setCategoriesAction = (categories) => ({
  type: SET_CATEGORIES,
  payload: { categories },
});

export const selectCategoryAction = (categoryName) => ({
  type: SELECT_CATEGORY,
  payload: { categoryName },
});

export const setNewCategoryNameAction = (newCategoryName) => ({
  type: SET_NEW_CATEGORY_NAME,
  payload: { newCategoryName },
});

export const setChineseAction = (chinese) => ({
  type: SET_CHINESE,
  payload: { chinese },
});

export const setFileAction = (file) => ({
  type: SET_FILE,
  payload: { file },
});

export const setSpeechSpeedAction = (speed) => ({
  type: SET_SPEECH_SPEED,
  payload: { speed },
});

export const setSpeechPitchAction = (pitch) => ({
  type: SET_SPEECH_PITCH,
  payload: { pitch },
});


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
