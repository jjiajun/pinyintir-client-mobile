import { View, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import { Context } from './Context.js';
import LogIn from './screens/LogIn.jsx';
import HomeTabs from './components/HomeTabs.jsx';
import LandingPage from './screens/LandingPage.jsx';

export default function App() {
  const Stack = createNativeStackNavigator();
  const [allImages, setAllImages] = useState();
  const [allPhrases, setAllPhrases] = useState();

  return (
    <NavigationContainer>
      <View style={{ height: StatusBar.currentHeight }} />
      <Context.Provider
        value={{
          allImages, setAllImages, allPhrases, setAllPhrases,
        }}
      >
        <Stack.Navigator initialRouteName="LogIn" screenOptions={{ headerShown: false }}>
          <Stack.Screen
            name="LogIn"
            component={LandingPage}
            options={{ title: 'Log In' }}
          />
          <Stack.Screen
            name="Home"
            component={HomeTabs}
            options={{ title: 'Scan' }}
          />
        </Stack.Navigator>
      </Context.Provider>
    </NavigationContainer>
  );
}
