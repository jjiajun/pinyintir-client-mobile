import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { REACT_APP_BACKEND } from 'react-native-dotenv';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Camera, takePictureAsync } from 'expo-camera';
import {
  View, Text, StyleSheet, TouchableOpacity, ActivityIndicator,
} from 'react-native';
import { CameraIcon, ArrowLeftIcon, DocumentTextIcon } from 'react-native-heroicons/outline';
import Overlay from '../components/Overlay.jsx';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  camButtonContainer: {
    flex: 1,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    margin: 20,
    justifyContent: 'space-around',
    alignItems: 'flex-end',
  },
  camButton: {
    padding: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    borderRadius: 50,
    borderColor: 'white',
    borderWidth: 1,
  },
  buttonContainer: {
    position: 'absolute',
    top: 0,
    padding: 5,
    zIndex: 100,
  },
  button: {
    padding: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    borderRadius: 50,
    borderColor: 'white',
    borderWidth: 1,
    marginBottom: 5,
  },
  text: {
    fontSize: 18,
    color: 'white',
  },
  spinner: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const Scan = (props) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [chinese, setChinese] = useState([]);
  const [isImage, setIsImage] = useState(false);
  const [isResults, setIsResults] = useState(false);
  const [loading, setLoading] = useState(false);
  const [imageDimension, setImageDimension] = useState({});

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
        setLoading(true);
        const picture = await camera.current.takePictureAsync({
          quality: 0.3,
          base64: true,
        });
        camera.current.pausePreview();
        const { base64, height, width } = picture;
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
        setLoading(false);
        setImageDimension({ height, width });
      }
    } catch (err) {
      console.log(err);
      camera.current.resumePreview();
      setLoading(false);
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
        <View style={styles.spinner}>
          <ActivityIndicator animating={loading} size="large" color="#00ff00" />
        </View>

        {isImage ? (
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={continueVideo}>
              <ArrowLeftIcon color="white" />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => setIsResults((prev) => !prev)}
            >
              <DocumentTextIcon color="white" />
            </TouchableOpacity>
          </View>
        ) : (!loading
            && (
              <View style={styles.camButtonContainer}>
                <TouchableOpacity style={styles.camButton} onPress={scanPicture}>
                  <CameraIcon color="white" />
                </TouchableOpacity>
              </View>
            )
        )}

      </Camera>
      {isResults && (
      <Overlay
        returnData={chinese}
        dimension={imageDimension}
        continueVideo={continueVideo}
        toggleOverlay={setIsResults}
      />
      )}
    </View>
  );
};

export default Scan;
