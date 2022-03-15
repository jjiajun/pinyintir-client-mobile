import React, { useState, useEffect, useRef } from 'react';
import { StatusBar } from 'expo-status-bar';
import axios from 'axios';
import { REACT_APP_BACKEND } from 'react-native-dotenv';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Camera, takePictureAsync } from 'expo-camera';
import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
} from 'react-native';
import Colors from '../constants/colors.js';
// import Input from '../components/Input.jsx';
// import Card from '../components/Card.jsx';
// import CustomButton from '../components/CustomButton.jsx';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    margin: 20,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  button: {
    padding: 20,
  },
  text: {
    fontSize: 18,
    color: 'white',
  },
});

const Scan = (props) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);

  const [file, setFile] = useState();
  const [description, setDescription] = useState('');
  const [allImages, setAllImages] = useState([]);
  const [id, setId] = useState();
  let displayImages;
  let auth;
  let userId;
  let token;

  const camera = useRef(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  /** To get userId and token for axios calls at every render */
  useEffect(() => {
    const getData = async () => {
      try {
        userId = await AsyncStorage.getItem('@userId');
        token = await AsyncStorage.getItem('@sessionToken');
        console.log('USERID: ', userId);
        console.log('TOKEN: ', token);
      } catch (err) {
        console.log(err);
      }
    };
    getData();
    // create authorization header
    auth = { headers: { Authorization: `Bearer ${token}` } };
  });

  const switchCamera = () => {
    setType(
      type === Camera.Constants.Type.back
        ? Camera.Constants.Type.front
        : Camera.Constants.Type.back,
    );
  };

  const scanPicture = async () => {
    try {
      if (camera) {
        const picture = await camera.current.takePictureAsync({ quality: 0.5, base64: true });
        const { base64 } = picture;
        const resp = await axios.post('http://localhost:3004/vision', {
          requests: [
            {
              image: {
                content: base64,
              },
              features: [
                {
                  type: 'TEXT_DETECTION',
                  maxResults: 50,
                },
              ],
            },
          ],
        });
        console.log(resp.data.chinese);
      }
    } catch (err) {
      console.log(err);
    }
  };

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <Camera style={styles.camera} type={type} ref={camera}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={switchCamera}>
            <Text style={styles.text}>Flip</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={scanPicture}>
            <Text style={styles.text}>Scan</Text>
          </TouchableOpacity>
        </View>
      </Camera>
    </View>
  );
};

export default Scan;
