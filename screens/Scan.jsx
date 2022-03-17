import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { REACT_APP_BACKEND } from 'react-native-dotenv';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Camera, takePictureAsync } from 'expo-camera';
import {
  View, Text, StyleSheet, TouchableOpacity,
} from 'react-native';
import { CameraIcon, ArrowLeftIcon, DocumentTextIcon } from 'react-native-heroicons/outline';
import Colors from '../constants/colors.js';
import ResultsOutput from '../components/ResultsOutput.jsx';

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
    justifyContent: 'space-around',
    alignItems: 'flex-end',
  },
  button: {
    padding: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    borderRadius: 50,
    borderColor: 'white',
    borderWidth: 1,
  },
  text: {
    fontSize: 18,
    color: 'white',
  },
});

const Scan = (props) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [chinese, setChinese] = useState([]);
  const [isImage, setIsImage] = useState(false);
  const [isResults, setIsResults] = useState(false);

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

  const scanPicture = async () => {
    try {
      if (camera) {
        const picture = await camera.current.takePictureAsync({
          quality: 0.3,
          base64: true,
        });
        camera.current.pausePreview();
        const { base64 } = picture;
        const resp = await axios.post(`${REACT_APP_BACKEND}/vision`, {
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
        setChinese(resp.data.chinese);
        setIsImage(true);
        setIsResults(true);
      }
    } catch (err) {
      console.log(err);
      camera.current.resumePreview();
    }
  };

  const continueVideo = () => {
    camera.current.resumePreview();
    setChinese([]);
    setIsImage(false);
    setIsResults(false);
  };

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <Camera style={styles.camera} type={Camera.Constants.Type.back} ref={camera}>
        <View style={styles.buttonContainer}>
          {isImage ? (
            <>
              <TouchableOpacity style={styles.button} onPress={continueVideo}>
                <ArrowLeftIcon color="white" />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.button}
                onPress={() => setIsResults(true)}
              >
                <DocumentTextIcon color="white" />
              </TouchableOpacity>
            </>
          ) : (
            <TouchableOpacity style={styles.button} onPress={scanPicture}>
              <CameraIcon color="white" />
            </TouchableOpacity>
          )}
        </View>
      </Camera>
      <ResultsOutput
        isResults={isResults}
        setIsResults={setIsResults}
        chinese={chinese}
      />
    </View>
  );
};

export default Scan;
