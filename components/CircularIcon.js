import React from 'react';
import { View, Image, StyleSheet } from 'react-native';


const CircularIcon = ({ iconSource }) => {
    return (
      <View style={styles.container}>
        <Image source={iconSource} style={styles.icon} />
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      width: 50, // Adjust as needed
      height: 50, // Adjust as needed
      borderRadius: 25, // Half of width and height to make it circular
      backgroundColor: 'lightgray', // Background color of the container
      justifyContent: 'center',
      alignItems: 'center',
    },
    icon: {
      width: 30, // Adjust as needed
      height: 30, // Adjust as needed
      // Other icon styles...
    },
  });

  export default CircularIcon;
