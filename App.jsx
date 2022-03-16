import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
// import { StyleSheet } from 'react-native';
import React, { useState } from "react";
import { Context } from "./Context.js";
import LogIn from "./screens/LogIn.jsx";
import Scan from "./screens/Scan.jsx";
import ImageStash from "./screens/ImageStash.jsx";

export default function App() {
  const Stack = createNativeStackNavigator();
  const [allImages, setAllImages] = useState();

  return (
    <NavigationContainer>
      <Context.Provider
        value={{ allImages: allImages, setAllImages: setAllImages }}
      >
        <Stack.Navigator initialRouteName="LogIn">
          <Stack.Screen
            name="LogIn"
            component={LogIn}
            options={{ title: "Log In" }}
          />
          <Stack.Screen
            name="Scan"
            component={Scan}
            options={{ title: "Scan" }}
          />
          <Stack.Screen
            name="ImageStash"
            component={ImageStash}
            options={{ title: "Image Stash" }}
          />
        </Stack.Navigator>
      </Context.Provider>
    </NavigationContainer>
  );
}
