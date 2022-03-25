import React, { useContext, useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  CameraIcon, CogIcon, LoginIcon, PhotographIcon, TranslateIcon,
} from 'react-native-heroicons/outline';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Context, setAuthAction } from '../Context.jsx';
import Scan from '../screens/Scan/Scan.jsx';
import ImageGallery from '../screens/ImageGallery.jsx';
import PhraseGallery from '../screens/PhraseGallery/Phrase.jsx';
import Settings from '../screens/Settings.jsx';
import LandingPage from '../screens/LandingPage.jsx';

const HomeTabs = () => {
  const Tab = createBottomTabNavigator();

  const { store, dispatch } = useContext(Context);
  const { auth } = store;
  console.log(auth);
  /** To get userId and token for axios calls at every render */
  useEffect(() => {
    (async () => {
      try {
        const token = await AsyncStorage.getItem('@sessionToken');
        if (!token) {
          dispatch(setAuthAction(false));
          return;
        }
        dispatch(setAuthAction(true));
      } catch (err) {
        console.log(err);
        dispatch(setAuthAction(false));
      }
    })();
  }, [auth]);

  return (
    <Tab.Navigator initialRouteName="Scan" screenOptions={{ headerShown: false, tabBarHideOnKeyboard: true }} backBehavior="history">
      {auth ? (
        <>
          <Tab.Screen name="Images" component={ImageGallery} options={{ tabBarIcon: PhotographIcon }} />
          <Tab.Screen name="Scan" component={Scan} options={{ tabBarIcon: CameraIcon }} />
          <Tab.Screen name="Phrases" component={PhraseGallery} options={{ tabBarIcon: TranslateIcon }} />
          <Tab.Screen name="Settings" component={Settings} options={{ tabBarIcon: CogIcon }} />
        </>
      ) : (
        <>
          <Tab.Screen name="Scan" component={Scan} options={{ tabBarIcon: CameraIcon }} />
          <Tab.Screen name="Log In" component={LandingPage} options={{ tabBarIcon: LoginIcon }} />
        </>
      )}
    </Tab.Navigator>
  );
};

export default HomeTabs;
