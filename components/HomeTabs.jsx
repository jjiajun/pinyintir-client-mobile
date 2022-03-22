import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  CameraIcon, CogIcon, PhotographIcon, TranslateIcon,
} from 'react-native-heroicons/outline';
import Scan from '../screens/Scan/Scan.jsx';
import ImageGallery from '../screens/ImageGallery.jsx';
import PhraseGallery from '../screens/PhraseGallery.jsx';
import Settings from '../screens/Settings.jsx';

const HomeTabs = () => {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator initialRouteName="Scan" screenOptions={{ headerShown: false }} backBehavior="history">
      <Tab.Screen name="Images" component={ImageGallery} options={{ tabBarIcon: PhotographIcon }} />
      <Tab.Screen name="Scan" component={Scan} options={{ tabBarIcon: CameraIcon }} />
      <Tab.Screen name="Phrases" component={PhraseGallery} options={{ tabBarIcon: TranslateIcon }} />
      <Tab.Screen name="Settings" component={Settings} options={{ tabBarIcon: CogIcon }} />
    </Tab.Navigator>
  );
};

export default HomeTabs;
