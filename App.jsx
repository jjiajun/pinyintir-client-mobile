import React from 'react';
import { View, StatusBar, LogBox } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MenuProvider } from 'react-native-popup-menu';
import { PinyintirProvider } from './Context.jsx';
import HomeTabs from './components/HomeTabs.jsx';

LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs();// Ignore all log notifications

export default function App() {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <View style={{ height: StatusBar.currentHeight }} />
      <PinyintirProvider>
        <MenuProvider>
          <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Home" component={HomeTabs} />
          </Stack.Navigator>
        </MenuProvider>
      </PinyintirProvider>
    </NavigationContainer>
  );
}
