import React from "react";
import { View, Text, StyleSheet } from "react-native";
import IconButton from "./IconButton";
import {textStyle} from '../helpers/styles';
import { format } from 'date-fns'; // For date-fns


const ExpenseRow = ({ icon, title, date, price, }) => {
  const convertedString= new Date(date); // Convert string to Date object
  const formattedDate = format(convertedString, 'dd MMMM yyyy - hh:mm aa ');

  return (
    <View style={styles.container}>
      <IconButton iconName={icon} color="white" backgroundColor={icon =="money-bill" ? "#5D9C59" : "#A94438"} />
      <View style={styles.titleAndDate}>
        <Text style={styles.title}>{title}</Text>
        <Text style={[styles.date, textStyle.text]}>{formattedDate}</Text>
      </View>
      <Text style={[styles.price, icon =="money-bill" ? textStyle.earnedTextColor : textStyle.paidTextColor]}>
        {icon == "money-bill" ? '+' : '-'}
        {price}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  titleAndDate:{
    width: 50,
    height: 50,
    flex: 1,
    marginLeft: 10,
  },
  icon: {
    marginRight: 10,
  },
  title: {
    flex: 1,
    fontSize: 18,
    color:"white",

  },
  date:{
    fontSize: 14,
    fontWeight: '200'
  },
  price: {
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default ExpenseRow;
