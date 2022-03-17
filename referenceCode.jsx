import { v4 as uuidv4 } from "uuid";

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
  const result = await axios.post(`${REACT_APP_BACKEND}/api/images`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  setAllImages([
    ...allImages,
    {
      id: uuidv4(),
      imagePath: result.data.imagePath,
      description,
    },
  ]); // adds newly image data to allImages state. I am updating the allImages state directly on the FE instead of getting the updated list from BE so that the update is instantaneous. The BE is still updated, therefore if the page is reloaded, the image list will still be the latest. The useEffect function below ensures it.
};
