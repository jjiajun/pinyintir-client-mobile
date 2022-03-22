import { View, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { MenuProvider } from 'react-native-popup-menu';
import { PinyintirProvider } from './Context.jsx';
import HomeTabs from './components/HomeTabs.jsx';
import LandingPage from './screens/LandingPage.jsx';

export default function App() {
  const Stack = createNativeStackNavigator();

  return (
    <MenuProvider>
    <NavigationContainer>
      <View style={{ height: StatusBar.currentHeight }} />
      <PinyintirProvider>
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
      </PinyintirProvider>
    </NavigationContainer>
    </MenuProvider>
  );
}
