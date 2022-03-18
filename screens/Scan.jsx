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
  ActivityIndicator,
} from 'react-native';
import { v4 as uuidv4 } from 'uuid';
import { Context } from '../Context.js';
import Colors from '../constants/colors.js';
import ResultsOutput from '../components/ResultsOutput.jsx';
// import Input from '../components/Input.jsx';
import Card from '../components/Card.jsx';
import CustomButton from '../components/CustomButton.jsx';
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

const Scan = ({ navigation }) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [chinese, setChinese] = useState([]);
  const [isImage, setIsImage] = useState(false);
  const [isResults, setIsResults] = useState(false);
  const [file, setFile] = useState();
  const {
    allImages, setAllImages, allPhrases, setAllPhrases,
  } = useContext(Context);
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
        auth = { headers: { Authorization: `Bearer ${token}` } };
      } catch (err) {
        console.log(err);
      }
    };
    getData();
  });

  // const switchCamera = () => {
  //   setType(
  //     type === Camera.Constants.Type.back
  //       ? Camera.Constants.Type.front
  //       : Camera.Constants.Type.back,
  //   );
  // };

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
        setLoading(true);
        const picture = await camera.current.takePictureAsync({
          quality: 0.3,
          base64: true,
        });
        camera.current.pausePreview();
        console.log('PICTURE: ', picture);
        console.log('uri: ', picture.uri);
        const { base64, height, width } = picture;
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
