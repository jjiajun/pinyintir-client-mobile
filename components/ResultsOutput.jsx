import React from 'react';
import {
  View, Text, StyleSheet, Modal, FlatList, Button, TouchableOpacity,
} from 'react-native';
import ChineseCard from './ChineseCard.jsx';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    width: '100%',
  },
  button: {
    paddingRight: 20,
  },
  text: {
    fontSize: 24,
  },
});

const ResultsOutput = ({ isResults, setIsResults, chinese }) => {
  const handleClose = () => {
    setIsResults(false);
  };

  return (
    <Modal visible={isResults}>
      <View style={styles.container}>
        <View style={styles.buttons}>
          <TouchableOpacity style={styles.button} onPress={handleClose}>
            <Text style={styles.text}>X</Text>
          </TouchableOpacity>
        </View>

        {chinese.length > 0 ? (
          <FlatList
            data={chinese}
            renderItem={(itemData) => (
              <ChineseCard
                item={itemData.item}
              />
            )}
          />
        ) : (
          <Text> No text detected</Text>
        )}

      </View>
    </Modal>
  );
};

export default ResultsOutput;
