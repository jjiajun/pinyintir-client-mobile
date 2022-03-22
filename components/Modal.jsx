import React, { useContext } from 'react';

import {
  View, Text, StyleSheet, Modal, Pressable,
} from 'react-native';
import Input from './Input.jsx';
import CustomButton from './CustomButton.jsx';
import Card from './Card.jsx';

import {
  Context, setNewCategoryNameAction,
} from '../Context.jsx';

const styles = StyleSheet.create({
  header: {
    fontSize: 16,
    marginVertical: 5,
    fontWeight: '900',
    color: 'black',
    textAlign: 'center',
  },
  card: {
    padding: 20,
    height: 220,
    width: 260,
    justifyContent: 'space-around',
    alignItems: 'center',
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
  input: {
    height: 40,
    width: 175,
  },
});

const ModalComponent = (props) => {
  const { store, dispatch } = useContext(Context);
  const { newCategoryName } = store;
  const {
    modalVisible, setModalVisible, submitFunction, userId,
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
            <Card style={styles.card}>
              <Text style={styles.header}>Create new category</Text>
              <Input
                placeholder="Category name"
                onChangeText={(el) => dispatch(setNewCategoryNameAction(el))}
                style={styles.input}
              />
              <CustomButton
                style={styles.button}
                title="Create"
                onPress={() => submitFunction(newCategoryName, userId)}
              />
            </Card>
          </Pressable>
        </Pressable>
      </Modal>
    </View>
  );
};

export default ModalComponent;
