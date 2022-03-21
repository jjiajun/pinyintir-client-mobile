import React from 'react';
import { View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';
import ChineseCard from './ChineseCard.jsx';
import colors from '../constants/colors.js';

const styles = StyleSheet.create({
  menuTrigger: {
    padding: 5,
  },
  overlay: {
    position: 'absolute',
  },
});

const triggerStyles = {
  triggerText: {
    color: 'white',
  },
  triggerWrapper: {
    backgroundColor: 'rgba(95, 26, 148, 0.5)',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  triggerTouchable: {
    underlayColor: 'darkblue',
    activeOpacity: 70,
    style: {
      flex: 1,
    },
  },
};

const optionsStyles = {
  optionsContainer: {
    backgroundColor: colors.darkPurple,
    padding: 5,
    borderRadius: 5,
  },
};
const optionStyles = {
  optionTouchable: {
    underlayColor: 'darkblue',
    activeOpacity: 40,
  },
  optionWrapper: {
    backgroundColor: colors.darkPurple,
    margin: 1,

  },
  optionText: {
    color: 'white',
    padding: 5,
  },
};

const OverlayTextButton = (props) => (

  <View style={{ ...styles.overlay, ...props.styles }}>
    <Menu onSelect={(value) => console.log(`Selected number: ${value}`)} style={styles.menuTrigger}>
      <MenuTrigger text={props.text.pinyin} customStyles={triggerStyles} />
      <MenuOptions customStyles={optionsStyles}>
        <Text>{props.text.vertices[0].y, props.text.vertices[0].x}</Text>
        <ChineseCard item={props.text} />
        <View
          style={{
            borderBottomColor: 'white',
            borderBottomWidth: StyleSheet.hairlineWidth,
          }}
        />
        <MenuOption
          value={1}
          text="Save"
          customStyles={optionStyles}
          onSelect={() => {
            props.savePhrase(props.text); }}
        />
      </MenuOptions>
    </Menu>
  </View>

);

// OverlayTextButton.propTypes = {
//   navigation: PropTypes.shape({
//     props.text: PropTypes.shape.isRequired,
//   }).isRequired,
// };

export default OverlayTextButton;
