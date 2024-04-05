import React from "react";
import { View, StyleSheet } from "react-native";
import { FontAwesome5 } from '@expo/vector-icons';

const IconButton = ({ iconName, color, backgroundColor }) => {
  return (
    <View style={[styles.card, { backgroundColor: backgroundColor }]}>
      <FontAwesome5 name={iconName} size={20} color={color} />
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: 50,
    height: 50,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
});

export default IconButton;
