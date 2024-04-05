import { StyleSheet } from 'react-native';


export const titleStyle = StyleSheet.create({
    title: {
      fontFamily: "PlayfairDisplay",
      fontSize: 24,
      fontWeight: "bold",
      color: "black",
      paddingHorizontal: 10,
      color:"white"
    },
    titleContainer: {
        alignItems: 'flex-start',
        marginTop: 8
      },
  });

  export const textStyle = StyleSheet.create({
    text:{
        color:"white",
    },
    paidTextColor: {
        color: "#E83A14"
    },
    earnedTextColor:{
        color: "#5D9C59"

    }
  });
