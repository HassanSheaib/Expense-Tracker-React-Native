import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

const FloatingButton = ({ onPress, icon }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={onPress}>
        <FontAwesome5 name={icon} size={26} color="white" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    alignSelf: 'center',
    marginBottom: 16,
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default FloatingButton;