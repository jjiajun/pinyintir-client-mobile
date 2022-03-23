import React from 'react';

import {
  View, StyleSheet, Modal, Pressable,
} from 'react-native';
import Colors from '../utils/colors.js';

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.primary,
  },
  modal: {
    color: 'white',
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
});

const ModalComponent = (props) => {
  const {
    modalVisible, setModalVisible,
  } = props;

  return (
    <View style={styles.modal}>
      <Modal
        animationType="fade"
        transparent
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <Pressable
          onPress={() => setModalVisible(false)}
          style={[styles.modal, modalVisible ? { backgroundColor: 'rgba(0, 0, 0, 0.4)' } : '']}
        >
          <Pressable
            onPress={() => setModalVisible(true)}
          >
            {props.children}
          </Pressable>
        </Pressable>
      </Modal>
    </View>
  );
};

export default ModalComponent;
