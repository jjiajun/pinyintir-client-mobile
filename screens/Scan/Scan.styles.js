import { StyleSheet } from 'react-native';
import Colors from '../../constants/colors.js';

export default StyleSheet.create({
  button: {
    padding: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    borderRadius: 50,
    borderColor: 'white',
    borderWidth: 1,
    marginBottom: 5,
  },
  buttonContainer: {
    position: 'absolute',
    top: 0,
    padding: 5,
    zIndex: 100,
  },
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
  messageContainer: {
    width: '80%',
    height: 30,
    alignSelf: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  message: {
    color: 'red',
    fontWeight: 'bold',
  },
  noAccessContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  noAccess: {
    fontWeight: 'bold',
    textAlign: 'center',
  },
  grantAccessButton: {
    backgroundColor: Colors.primary,
  },
});
