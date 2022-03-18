import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import {
  MenuContext,
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
  MenuProvider,
} from 'react-native-popup-menu';
import ChineseCard from './ChineseCard.jsx';

// const Input = (props) => {
//   return <TextInput {...props} style={{ ...styles.input, ...props.style }} />;
// };

const styles = StyleSheet.create({
  menuText: {
    padding: 5,
  },
  overlay: {
    position: 'absolute',
  },
});

const OverlayTextButton = (props) => (

  <View style={{ ...styles.overlay, ...props.styles }}>
    <Menu onSelect={(value) => console.log(`Selected number: ${value}`)}>
      <MenuTrigger text={props.text.pinyin} />
      <MenuOptions>
        <ChineseCard item={props.text} />
        <MenuOption
          value={1}
          text="Save"
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
