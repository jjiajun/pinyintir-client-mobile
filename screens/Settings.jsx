import React, { useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  Alert, StyleSheet, View,
} from 'react-native';
import Colors from '../constants/colors.js';
import CustomButton from '../components/CustomButton.jsx';
import { Context, setSpeechSpeedAction, setSpeechPitchAction } from '../Context.jsx';
import RangeInput from '../components/RangeInput.jsx';

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    backgroundColor: Colors.primary,
  },
});

const Settings = ({ navigation }) => {
  const { store, dispatch } = useContext(Context);
  const { speechSpeed, speechPitch } = store;

  const handleSpeedChange = (val) => {
    dispatch(setSpeechSpeedAction(val));
  };

  const handlePitchChange = (val) => {
    dispatch(setSpeechPitchAction(val));
  };

  const handleLogout = async () => {
    await AsyncStorage.removeItem('@sessionToken');
    await AsyncStorage.removeItem('@userId');
    navigation.navigate('LogIn');
  };

  const showAlert = () => {
    Alert.alert('Confirmation required', 'Do you really want to logout?', [
      { text: 'Cancel' },
      { text: 'Log Out', onPress: handleLogout },
    ]);
  };

  return (
    <View style={styles.screen}>
      <RangeInput
        label="Text-to-Speech speed:"
        value={speechSpeed}
        handleChange={handleSpeedChange}
      />
      <RangeInput
        label="Text-to-Speech pitch:"
        value={speechPitch}
        handleChange={handlePitchChange}
      />
      <CustomButton title="Log Out" style={styles.button} onPress={showAlert} />
    </View>
  );
};

export default Settings;
