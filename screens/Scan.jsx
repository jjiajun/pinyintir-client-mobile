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
import ResultsOutput from '../components/ResultsOutput.jsx';
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
    justifyContent: 'space-around',
    alignItems: 'flex-end',
  },
  button: {
    padding: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    borderRadius: 20,
  },
  text: {
    fontSize: 18,
    color: 'white',
  },
});

const Scan = (props) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [chinese, setChinese] = useState([]);
  const [isImage, setIsImage] = useState(false);
  const [isResults, setIsResults] = useState(false);

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
        const picture = await camera.current.takePictureAsync({ quality: 0.3, base64: true });
        camera.current.pausePreview();
        const { base64 } = picture;
        const resp = await axios.post('http://192.168.86.182:3004/vision', {
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
      <Camera style={styles.camera} type={type} ref={camera}>
        <View style={styles.buttonContainer}>

          {isImage ? (
            <>
              <TouchableOpacity style={styles.button} onPress={continueVideo}>
                <Text style={styles.text}>Back</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={() => setIsResults(true)}>
                <Text style={styles.text}>Show Results</Text>
              </TouchableOpacity>
            </>
          ) : (
            <>
              <TouchableOpacity style={styles.button} onPress={switchCamera}>
                <Text style={styles.text}>Flip</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={scanPicture}>
                <Text style={styles.text}>Scan</Text>
              </TouchableOpacity>
            </>
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
