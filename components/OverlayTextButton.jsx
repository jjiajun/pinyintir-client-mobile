import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import {
  MenuContext,
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
  MenuProvider,
} from 'react-native-popup-menu';
import ChineseCard from './ChineseCard';

// const Input = (props) => {
//   return <TextInput {...props} style={{ ...styles.input, ...props.style }} />;
// };
const styles = StyleSheet.create({
  menu: {
    position: 'absolute',
  },
  menuText: {
    padding: 5,
  },
});

const OverlayTextButton = (props) => (

  <View style={{ position: 'absolute', ...props.styles }}>
    <Menu onSelect={(value) => console.log(`Selected number: ${value}`)}>
      <MenuTrigger text={props.text.pinyin} style={{ color: 'white' }} />
      <MenuOptions>
        <ChineseCard item={props.text} />
        <MenuOption
          value={1}
          text="Save"
          onPress={() => props.savePhrase(
            props.text,
          )}
        />
      </MenuOptions>
    </Menu>
  </View>

);

export default OverlayTextButton;
