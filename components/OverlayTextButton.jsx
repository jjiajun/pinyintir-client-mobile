import React, { useContext } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';
import ChineseCard from './ChineseCard.jsx';
import { Context } from '../Context.jsx';
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
    backgroundColor: 'rgba(255, 155, 83, 0.5)',
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
    backgroundColor: colors.primary,
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
    backgroundColor: colors.primary,
    margin: 1,

  },
  optionText: {
    color: 'white',
    padding: 5,
  },
};

const OverlayTextButton = (props) => {
  const { store } = useContext(Context);
  const { auth } = store;

  return (
    <View style={{ ...styles.overlay, ...props.styles }}>
      <Menu onSelect={(value) => console.log(`Selected number: ${value}`)} style={styles.menuTrigger}>
        <MenuTrigger text={props.text.pinyin} customStyles={triggerStyles} />
        <MenuOptions customStyles={optionsStyles}>
          <Text>{props.text.vertices[0].y}, {props.text.vertices[0].x}</Text>
          <ChineseCard item={props.text} />

          {auth && props.allowSave && (
            <>
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
            </>
          )}
        </MenuOptions>
      </Menu>
    </View>
  ); };

export default OverlayTextButton;
