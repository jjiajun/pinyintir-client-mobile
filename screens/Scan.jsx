import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import axios from "axios";
import { REACT_APP_BACKEND } from "react-native-dotenv";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Camera } from "expo-camera";
import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import Colors from "../constants/colors.js";
import Input from "../components/Input.jsx";
import Card from "../components/Card.jsx";
import CustomButton from "../components/CustomButton.jsx";

const styles = StyleSheet.create({
  screen: {
    // flex: 1,
    padding: 10,
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    marginVertical: 10,
    color: "black",
  },
  container: {
    width: 300,
    maxWidth: "80%",
    height: 300,
    alignItems: "center",
    display: "flex",
    justifyContent: "center",
  },
  button: {
    backgroundColor: Colors.primary,
  },
  input: {
    width: 150,
  },
});

const Scan = (props) => {
  const [file, setFile] = useState();
  const [description, setDescription] = useState("");
  const [allImages, setAllImages] = useState([]);
  const [id, setId] = useState();
  let displayImages;
  let auth;
  let userId;
  let token;

  /** To get userId and token for axios calls at every render */
  useEffect(() => {
    const getData = async () => {
      try {
        userId = await AsyncStorage.getItem("@userId");
        token = await AsyncStorage.getItem("@sessionToken");
        console.log("USERID: ", userId);
        console.log("TOKEN: ", token);
      } catch (err) {
        console.log(err);
      }
    };
    getData();
    // create authorization header
    auth = { headers: { Authorization: `Bearer ${token}` } };
  });

  /** Get all the images by userId. Only triggered when page first loads */
  useEffect(() => {
    axios
      .post(`${REACT_APP_BACKEND}/getuserdatabyid`, { userId }, auth)
      .then((response) => {
        console.log(response);
        setAllImages([...response.data.userProfile.images]);
        // setState is async. The only way to check the allImages value after setState has completed is to use useEffect (runs after the page has re-rendered)!
      });
  }, []);

  /** Submit function to upload image to db + aws */
  const submit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("image", file);
    formData.append("description", description);
    formData.append("userId", userId); // need to append userId to formData in order to send userId to the backend. This method seems to be the only way - I tried putting formData and userId in an object to send it through but it didn't work.
    const result = await axios.post(
      `${REACT_APP_BACKEND}/api/images`,
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    setAllImages([
      ...allImages,
      {
        imagePath: result.data.imagePath,
        description,
      },
    ]); // adds newly image data to allImages state. I am updating the allImages state directly on the FE instead of getting the updated list from BE so that the update is instantaneous. The BE is still updated, therefore if the page is reloaded, the image list will still be the latest. The useEffect function below ensures it.
  };

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss;
      }}
    >
      <View style={styles.screen}>
        <Text>This is the Scan page</Text>

        <StatusBar style="auto" />
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Scan;
