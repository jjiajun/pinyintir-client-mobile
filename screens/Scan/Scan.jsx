import React, {
  useState, useEffect, useRef, useContext,
} from 'react';
import axios from 'axios';
import { Camera } from 'expo-camera';
import { REACT_APP_BACKEND } from 'react-native-dotenv';
import PropTypes from 'prop-types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, Text } from 'react-native';
import { v4 as uuidv4 } from 'uuid';
import { useFocusEffect, useIsFocused } from '@react-navigation/native';
import { Context } from '../../Context.js';
import Colors from '../../constants/colors.js';
import NavBar from '../../components/NavBar.jsx';
import CustomButton from '../../components/CustomButton.jsx';
import Overlay from '../../components/Overlay.jsx';
import styles from './Scan.styles.js';
import CameraView from '../../components/CameraView.jsx';

const Scan = ({ navigation }) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [chinese, setChinese] = useState([]);
  const [isImage, setIsImage] = useState(false);
  const [isResults, setIsResults] = useState(false);
  const [file, setFile] = useState();
  const { allImages, setAllImages } = useContext(Context);
  const [imageDimension, setImageDimension] = useState({});

  let auth;
  let userId;
  let token;

  const camera = useRef(null);
  const isFocused = useIsFocused();

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  /** To get userId and token for axios calls at every render */
  useEffect(() => {
    (async () => {
      try {
        userId = await AsyncStorage.getItem('@userId');
        token = await AsyncStorage.getItem('@sessionToken');
        auth = { headers: { Authorization: `Bearer ${token}` } };
      } catch (err) {
        console.log(err);
      }
    })();
  });

  // this will reinitialise this component's state whenever it comes into focus
  // if not then we may run into scenario where user has overlay on from taking a picture
  // switches to image gallery mode and back to scan ->
  // will get a live camera view but prev overlays still active
  useFocusEffect(
    React.useCallback(() => {
      setChinese([]);
      setIsImage(false);
      setIsResults(false);
      setFile(null);
    }, []),
  );

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

  const continueVideo = () => {
    camera.current.resumePreview();
    setChinese([]);
    setIsImage(false);
    setIsResults(false);
  };

  if (hasPermission === null || !isFocused) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <CameraView
        camera={camera}
        continueVideo={continueVideo}
        setFile={setFile}
        setChinese={setChinese}
        setIsImage={setIsImage}
        isImage={isImage}
        setIsResults={setIsResults}
        setImageDimension={setImageDimension}
        saveScreenshot={saveScreenshot}
      />

      {isResults && (
        <Overlay
          returnData={chinese}
          dimension={imageDimension}
          continueVideo={continueVideo}
          toggleOverlay={setIsResults}
          saveScreenshot={saveScreenshot}
          auth={auth}
          userId={userId}
        />
      )}

      <NavBar>
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
      </NavBar>
    </View>
  );
};

Scan.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

export default Scan;
