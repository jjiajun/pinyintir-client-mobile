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

// const Input = (props) => {
//   return <TextInput {...props} style={{ ...styles.input, ...props.style }} />;
// };

const OverlayTextButton = (props) => (

  <MenuProvider>
    <Menu {...props} style={styles.menu} onSelect={(value) => console.log(`Selected number: ${value}`)}>
      <MenuTrigger text={props.pinyin} />
      <Text style={styles.menuText}>{props.chinese}</Text>
      <Text style={styles.menuText}>{props.pinyin}</Text>
      <Text style={styles.menuText}>{props.translation}</Text>
      <MenuOptions>
        <MenuOption value={1} text="Speak" />
        <MenuOption value={2}>
          <Text style={{ color: 'red' }}>Save</Text>
        </MenuOption>
        <MenuOption value={3} disabled text="Three" />
      </MenuOptions>
    </Menu>
  </MenuProvider>

);

const styles = StyleSheet.create({
  menu: {
    position: 'absolute',
  },
  menuText: {
    padding: 5,
  },
});

export default OverlayTextButton;
