import React, { useState } from "react";
import {
  View,
  Text,
  Modal,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

const CustomModal = ({ visible, setModalVisible, saveTarget }) => {
  const [target, setTarget] = useState();

  return (
    <Modal visible={visible} animationType="slide" transparent={true}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <View style={styles.titleAndXButtonContainer}>
            <Text style={styles.title}>Edit Target</Text>
            <TouchableOpacity onPress={()=>{setModalVisible(false)}}>
              <Text style={styles.xButton}>X</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.buttonContainer}>
            <TextInput
              style={styles.input}
              value={target}
              onChangeText={setTarget}
              placeholder="Enter value"
              keyboardType="numeric"

            />
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.saveButton} onPress={()=>{saveTarget(target)}}>
              <Text style={styles.buttonText}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
    modalContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.8)',

    },
    modalContent: {
      width: '80%',
      backgroundColor: 'white',
      padding: 20,
      borderRadius: 10,
      elevation: 5,
    },
    titleAndXButtonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 6,
    },
    title: {
      fontSize: 18,
      fontWeight: 'bold',
    },
    xButton: {
      fontSize: 18,
      fontWeight: 'bold',
    },
    buttonContainer: {
      marginVertical: 3,
    },
    input: {
      borderWidth: 1,
      borderColor: 'gray',
      borderRadius: 5,
      padding: 10,
    },
    saveButton: {
      backgroundColor: 'black',
      padding: 10,
      borderRadius: 5,
      alignItems: 'center',
    },
    buttonText: {
      color: 'white',
      fontWeight: 'bold',
    },
  });

export default CustomModal;
