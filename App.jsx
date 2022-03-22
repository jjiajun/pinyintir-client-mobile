import { View, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { PinyintirProvider } from './Context.jsx';
import LogIn from './screens/LogIn.jsx';
import HomeTabs from './components/HomeTabs.jsx';

export default function App() {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <View style={{ height: StatusBar.currentHeight }} />
      <PinyintirProvider>
        <Stack.Navigator initialRouteName="LogIn" screenOptions={{ headerShown: false }}>
          <Stack.Screen
            name="LogIn"
            component={LogIn}
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
  );
}
