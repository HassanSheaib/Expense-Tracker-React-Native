import React, { useContext } from "react";
import { View, Text, StyleSheet } from "react-native";
import { titleStyle } from "../helpers/styles";
import FloatingButton from "./FloatingButton";
import { format } from "date-fns"; // For date-fns
import { MyContext } from "../App.js";

const CustomNavBar = ({ isHome, onAddPress }) => {
  const { user } = useContext(MyContext);
  const date = new Date();
  const formattedDate = format(date, "MMMM d, yyyy");

  return (
    <View style={navBarContainer.bar}>
      <View style={[titleStyle.titleContainer, navBarContainer.container]}>
        <Text style={[titleStyle.title]}>Good Day {user}</Text>
        <Text style={navBarContainer.dateText}>{formattedDate}</Text>
      </View>
      {isHome ? (
        <View style={navBarContainer.button}>
          <FloatingButton icon="plus" onPress={onAddPress}></FloatingButton>
        </View>
      ) : (
        <View style={navBarContainer.button}></View>
      )}
    </View>
  );
};

export const navBarContainer = StyleSheet.create({
  bar: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#4D4D4D",
  },
  container: {
    alignItems: "flex-start",
    height: 50,
  },
  dateText: {
    fontWeight: "200",
    color: "white",
    paddingHorizontal: 10,
    paddingBottom: 10,
  },
  button: {
    paddingHorizontal: 50,
  },
});

export default CustomNavBar;
