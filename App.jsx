import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import { StyleSheet } from 'react-native';
import React, { useState } from 'react';
import { Context } from './Context.js';
import LogIn from './screens/LogIn.jsx';
import Scan from './screens/Scan/Scan.jsx';
import ImageGallery from './screens/ImageGallery.jsx';
import PhraseGallery from './screens/PhraseGallery.jsx';

export default function App() {
  const Stack = createNativeStackNavigator();
  const [allImages, setAllImages] = useState();
  const [allPhrases, setAllPhrases] = useState();

  return (
    <NavigationContainer>
      <Context.Provider
        value={{
          allImages, setAllImages, allPhrases, setAllPhrases,
        }}
      >
        <Stack.Navigator initialRouteName="LogIn" screenOptions={{ headerShown: false }}>
          <Stack.Screen
            name="LogIn"
            component={LogIn}
            options={{ title: 'Log In' }}
          />
          <Stack.Screen
            name="Scan"
            component={Scan}
            options={{ title: 'Scan' }}
          />
          <Stack.Screen
            name="ImageGallery"
            component={ImageGallery}
            options={{ title: 'Image Gallery' }}
          />
          <Stack.Screen
            name="PhraseGallery"
            component={PhraseGallery}
            options={{ title: 'Phrase Gallery' }}
          />
        </Stack.Navigator>
      </Context.Provider>
    </NavigationContainer>
  );
}
