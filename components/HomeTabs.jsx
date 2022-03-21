import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { CameraIcon, PhotographIcon, TranslateIcon } from 'react-native-heroicons/outline';
import Scan from '../screens/Scan/Scan.jsx';
import ImageGallery from '../screens/ImageGallery.jsx';
import PhraseGallery from '../screens/PhraseGallery.jsx';

const ScanTabIcon = ({ color }) => <CameraIcon color={color} />;
const ImagesTabIcon = ({ color }) => <PhotographIcon color={color} />;
const PhrasesTabIcon = ({ color }) => <TranslateIcon color={color} />;

const HomeTabs = () => {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator initialRouteName="Scan" screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Images" component={ImageGallery} options={{ tabBarIcon: ImagesTabIcon }} />
      <Tab.Screen name="Scan" component={Scan} options={{ tabBarIcon: ScanTabIcon }} />
      <Tab.Screen name="Phrases" component={PhraseGallery} options={{ tabBarIcon: PhrasesTabIcon }} />
    </Tab.Navigator>
  );
};

export default HomeTabs;
