import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert, StyleSheet, View } from 'react-native';
import Colors from '../constants/colors.js';
import CustomButton from '../components/CustomButton.jsx';

const Settings = ({ navigation }) => {
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
      <CustomButton title="Log Out" style={styles.button} onPress={showAlert} />
    </View>
  );
};

export default Settings;
