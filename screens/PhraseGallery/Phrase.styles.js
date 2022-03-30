import { StyleSheet } from 'react-native';
import Colors from '../../utils/colors.js';

export default StyleSheet.create({
  bold: {
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: Colors.primary,
    width: 220,
    height: 38,
  },
  card: {
    padding: 20,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  cardContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  circle: {
    height: 26,
    width: 26,
    marginHorizontal: 3,
    borderRadius: 50,
    backgroundColor: Colors.primary,
    marginRight: 14,
  },
  container: {
    flex: 4,
  },
  dropdownTrigger: {
    borderRadius: 8,
    paddingLeft: '7%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    textAlign: 'center',
    marginVertical: 20,
  },
  header: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  helperText: {
    fontSize: 11,
    marginVertical: 4,
    color: 'grey',
  },
  iconWhite: {
    color: 'white',
    marginHorizontal: 5,
    marginRight: 10,
  },
  iconBlack: {
    color: 'black',
    marginRight: 10,
  },
  input: {
    height: 40,
    width: 220,
    marginVertical: 10,
    paddingHorizontal: 15,
    textAlign: 'center',
  },
  italics: {
    fontStyle: 'italic',
  },
  linearGradient: {
    flex: 1,
  },
  message: {
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'white',
  },
  messageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalTitle: {
    fontSize: 16,
    marginVertical: 1,
    fontWeight: '900',
    color: 'black',
    textAlign: 'center',
  },
  options: {
    backgroundColor: 'white',
    height: 50,
    paddingHorizontal: 20,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  optionsContainer: {
    marginTop: 48,
    borderRadius: 20,
    paddingTop: 20,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    textAlign: 'center',
  },
  phraseCard: {
    width: '88%',
    margin: 8,
    borderRadius: 8,
  },
  pillsContainer: {
    width: 200,
    paddingVertical: 12,
    justifyContent: 'center',
  },
  redButton: {
    backgroundColor: Colors.orangeyRed,
    width: 200,
    margin: 10,
    height: 38,
    marginTop: 16,
  },
  screen: {
    flex: 1,
  },
  text: {
    fontSize: 14,
    marginVertical: 5,
    color: 'black',
    marginRight: 3,
  },
  characters: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  spinner: {
    position: 'absolute',
    top: '50%',
    left: '45%',
  },
});
