import React, {
  useState, useEffect, useRef, useContext,
} from 'react';
import axios from 'axios';
import { REACT_APP_BACKEND } from 'react-native-dotenv';
import PropTypes from 'prop-types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Camera, takePictureAsync } from 'expo-camera';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { v4 as uuidv4 } from 'uuid';
import { Context } from '../Context.js';
import Colors from '../constants/colors.js';
import ResultsOutput from '../components/ResultsOutput.jsx';
// import Input from '../components/Input.jsx';
import Card from '../components/Card.jsx';
import CustomButton from '../components/CustomButton.jsx';

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
    padding: 12,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    borderRadius: 20,
  },
  text: {
    fontSize: 18,
    color: 'white',
  },
});

const Scan = ({ navigation }) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [chinese, setChinese] = useState([]);
  const [isImage, setIsImage] = useState(false);
  const [isResults, setIsResults] = useState(false);
  const [file, setFile] = useState();
  const {
    allImages, setAllImages, allPhrases, setAllPhrases,
  } = useContext(Context);
  let userId;
  let token;
  let auth;

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
        auth = { headers: { Authorization: `Bearer ${token}` } };
      } catch (err) {
        console.log(err);
      }
    };
    getData();
  });

  const switchCamera = () => {
    setType(
      type === Camera.Constants.Type.back
        ? Camera.Constants.Type.front
        : Camera.Constants.Type.back,
    );
  };

  /** Submit function to upload image to db + aws */
  const saveScreenshot = async () => {
    const formData = new FormData();
    formData.append('image', file);
    formData.append('userId', userId); // need to append userId to formData in order to send userId to the backend. This method seems to be the only way - I tried putting formData and userId in an object to send it through but it didn't work.
    const result = await axios.post(`${REACT_APP_BACKEND}/api/images`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
      },
      transformRequest: (d) => d,
    });
    setAllImages([
      ...allImages,
      {
        id: uuidv4(),
        imagePath: result.data.imagePath,
      },
    ]);
    // Adds newly image data to allImages state.
    // I am updating the allImages state on the FE so that the update is instantaneous.
    // The BE is also updated. When the page is reloaded, the image list will still be the latest.
  };

  /** Submit function to upload image to db + aws */
  const savePhrase = async () => {
    const data = {
      chinesePhrase: '中国', pinyin: 'zhong guo', definition: 'China', userId,
    };
    const result = await axios.post(`${REACT_APP_BACKEND}/api/phrases`, data, auth);
    console.log('status: ', result);
    setAllPhrases([
      ...allPhrases,
      {
        id: uuidv4(),
        chinesePhrase: '中国',
        pinyin: 'zhong guo',
        definition: 'China',
      },
    ]);
    // Adds newly image data to allImages state.
    // I am updating the allImages state on the FE so that the update is instantaneous.
    // The BE is also updated. When the page is reloaded, the image list will still be the latest.
  };

  const scanPicture = async () => {
    try {
      if (camera) {
        const picture = await camera.current.takePictureAsync({
          quality: 0.3,
          base64: true,
        });
        camera.current.pausePreview();
        console.log('PICTURE: ', picture);
        console.log('uri: ', picture.uri);
        const { base64 } = picture;
        const localUri = picture.uri;
        const filename = localUri.split('/').pop();
        setFile({ uri: localUri, name: filename, type: 'image/jpeg' });
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
      <Camera style={styles.camera} type={type} ref={camera}>
        <View style={styles.buttonContainer}>
          {isImage ? (
            <>
              <TouchableOpacity style={styles.button} onPress={continueVideo}>
                <Text style={styles.text}>Back</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.button}
                onPress={() => setIsResults(true)}
              >
                <Text style={styles.text}>Show Results</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.button}
                onPress={saveScreenshot}
              >
                <Text style={styles.text}>Save Image</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.button}
                onPress={savePhrase}
              >
                <Text style={styles.text}>Save Phrase</Text>
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
      <Card>
        <CustomButton
          style={styles.button}
          title="Image Gallery"
          color={Colors.primary}
          onPress={() => navigation.navigate('ImageGallery')}
        />
        <CustomButton
          style={styles.button}
          title="Phrase Gallery"
          color={Colors.primary}
          onPress={() => navigation.navigate('PhraseGallery')}
        />
        <CustomButton
          style={styles.button}
          title="Log In"
          color={Colors.primary}
          onPress={() => navigation.navigate('LogIn')}
        />
      </Card>
    </View>
  );
};

Scan.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

export default Scan;
