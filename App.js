import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StyleSheet } from "react-native";
import React from "react";
import { InsertContextName } from "./InsertContextName.js";
import LogIn from "./screens/LogIn";
import Scan from "./screens/Scan";

export default function App() {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      {/* <InsertContextName.Provider value={}> */}
      <Stack.Navigator initialRouteName="Log In">
        <Stack.Screen
          name="LogIn"
          component={LogIn}
          options={{ title: "Overview" }}
        />
        <Stack.Screen name="Scan" component={Scan} />
      </Stack.Navigator>
      {/* </InsertContextName.Provider> */}
    </NavigationContainer>
  );
}
