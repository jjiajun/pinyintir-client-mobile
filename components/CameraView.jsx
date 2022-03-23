import React, { useContext } from 'react';
import { REACT_APP_BACKEND } from 'react-native-dotenv';
import { Camera } from 'expo-camera';
import axios from 'axios';
import {
  View, TouchableOpacity, ActivityIndicator,
} from 'react-native';
import {
  CameraIcon, ArrowLeftIcon, DocumentTextIcon, BookmarkIcon,
} from 'react-native-heroicons/outline';
import {
  Context, setChineseAction, setFileAction,
} from '../Context.jsx';
import styles from '../screens/Scan/Scan.styles.js';

const CameraView = ({
  camera, continueVideo, setIsImage, isImage, setMsg,
  setIsResults, setImageDimension, saveScreenshot, loading, setLoading,
}) => {
  const { store, dispatch } = useContext(Context);
  const { auth } = store;
  console.log(`${REACT_APP_BACKEND}/login`);

  const scanPicture = async () => {
    if (!camera) return;

    try {
      setLoading(true);
      setMsg('');
      const picture = await camera.current.takePictureAsync({
        quality: 0.3,
        base64: true,
      });
      camera.current.pausePreview();

      const { base64, height, width } = picture;
      const localUri = picture.uri;
      const filename = localUri.split('/').pop();
      dispatch(setFileAction({ uri: localUri, name: filename, type: 'image/jpeg' }));
      const data = {
        requests: [
          { image: { content: base64 }, features: [{ type: 'TEXT_DETECTION', maxResults: 50 }] },
        ],
      };

      const resp = await axios.post(`${REACT_APP_BACKEND}/vision`, data);
      setLoading(false);

      if (resp.data.chinese.length === 0) {
        setMsg('No Chinese text found!');
        setTimeout(() => {
          setMsg('');
        }, 3000);
        camera.current.resumePreview();
        return;
      }
      dispatch(setChineseAction(resp.data.chinese));
      setIsImage(true);
      setIsResults(true);
      setImageDimension({ height, width });
    } catch (err) {
      console.log(err);
      camera.current.resumePreview();
      setLoading(false);
      setMsg('An error occured, please try again');
      setTimeout(() => {
        setMsg('');
      }, 3000);
    }
  };

  return (
    <Camera style={styles.camera} type={Camera.Constants.Type.back} ratio="16:9" ref={camera}>
      <View style={styles.spinner}>
        <ActivityIndicator animating={loading} size="large" color="#00ff00" />
      </View>

      {isImage ? (
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={continueVideo}>
            <ArrowLeftIcon color="white" />
          </TouchableOpacity>
          {auth && (
          <TouchableOpacity
            style={styles.button}
            onPress={saveScreenshot}
          >
            <BookmarkIcon color="white" />
          </TouchableOpacity>
          )}
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
  );
};

export default CameraView;
