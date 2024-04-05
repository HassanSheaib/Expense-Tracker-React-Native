import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

const IncomeAndExpenseCard = ({ title, iconName, shadeColor, amount}) => {
  return (
    <View style={styles.card}>
      <View style={[styles.iconContainer, {backgroundColor: shadeColor}]}>
        <FontAwesome5 name={iconName} size={12} color="#F2E8C6" />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.text}>{title}</Text>
        <Text style={[styles.percentage, {color: shadeColor}]}>{amount}KWD</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#4D4D4D',
    borderRadius: 10,
    padding: 12,
    paddingVertical: 16,
    marginVertical: 5,
    elevation: 2,
    backgroundColor:'white',
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  percentage:{
    fontSize: 12,
    fontWeight:  '900',
  },
  iconContainer: {
    flex:1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:'#A94438',
    width: 40,
    height: 40,
    borderRadius: 20, // half of width and height to make it circular
    marginRight: 10,
  },
  textContainer: {
    flex: 3,
  },
  text: {
    fontFamily: "PlayfairDisplay",
    fontSize: 16,
  },
});
export default IncomeAndExpenseCard;
