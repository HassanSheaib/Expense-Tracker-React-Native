import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  Platform
} from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState, useEffect, useContext } from "react";
import Input from "../components/Input";
import { addTransacktionButtons } from "../helpers/constants";
import IconButton from "../components/IconButton";

import { MyContext } from "../App";

const AddTransactionModal = ({ onPress, modalVisible }) => {
  const showAlert = (title, message) => {
    Alert.alert(
      title,
      message,
      [
        {
          text: "OK",
          onPress: () => console.log("OK Pressed"),
        },
      ],
      { cancelable: false }
    );
  };
  const { user } = useContext(MyContext);

  const [expenseNote, setExpenseNote] = useState(undefined);
  const [amount, setAmount] = useState(undefined);
  const [pressedButton, setPressedButton] = useState(null);
  const [transactions, setTransactions] = useState([]);

  const validateInput = (transaction) => {
    const specialChars = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
    let transactionValid = !specialChars.test(transaction);
    return transactionValid;
  };
  useEffect(() => {
    const fetchExpenseData = async () => {
      try {
        const data = await AsyncStorage.getItem("transactions");
        if (data !== null) {
          setTransactions(JSON.parse(data));
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchExpenseData();
  }, []);

  const addTransaction = async () => {
    console.log("opened opened");
    const newTransaction = {
      title: expenseNote,
      category: pressedButton,
      amount: amount,
      date: new Date().toISOString(),
      user: user,
    };
    console.log(newTransaction);
    const isTransactionValid = validateInput(newTransaction.title);
    console.log("hello : " + isTransactionValid);
    if (!isTransactionValid || newTransaction.title == undefined) {
      showAlert(
        "Adding Expense Failed",
        "Please make sure you enter a valid Transaction Note"
      );
    } else if (isNaN(parseFloat(newTransaction.amount))) {
      showAlert(
        "Adding Expense Failed",
        "Please make sure you entered a valid Amount"
      );
    } else if (newTransaction.category == null) {
      showAlert(
        "Adding Expense Failed",
        "Please make sure to choose a category"
      );
    } else {
      try {
        setTransactions((prevTransactions) => {
          const updatedTransactions = [...prevTransactions, newTransaction];
          AsyncStorage.setItem(
            "transactions",
            JSON.stringify(updatedTransactions)
          )
            .then(() => console.log("Transaction added successfully."))
            .catch((error) =>
              console.error("Error saving transaction:", error)
            );
          setAmount(undefined);
          setExpenseNote(undefined);
          setPressedButton(null);
          return updatedTransactions;
        });
        onPress();
      } catch (error) {
        showAlert("Failed Adding Transaction", error);
      }
    }
  };

  const saveData = async () => {
    addTransaction();
  };

  const handlePress = (buttonName) => {
    setPressedButton(buttonName);
  };

  function saveButtonPressed() {
    saveData();
  }

  const CardWithIcon = ({ iconName, name, color }) => {
    return (
      <TouchableOpacity
        onPress={() => {
          handlePress(iconName);
        }}
      >
        <View style={addTransactionsStyles.card}>
          <IconButton
            iconName={iconName}
            backgroundColor={pressedButton == iconName ? color : "black"}
            color="#ffffff"
          />
          <Text style={addTransactionsStyles.buttonText}>{name}</Text>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <Modal
      animationType="slide" // You can customize animation type
      transparent={true} // Makes the modal transparent
      visible={modalVisible} // Controls whether the modal is visible
      onRequestClose={() => {}}
    >
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : null} // Try different behaviors
        style={{ flex: 1 }}
        enabled
      >
      <View style={modelStyles.container}>
        <View style={modelStyles.inputContainer}>
          <View style={modelStyles.hStack}>
            <Text style={modelStyles.title}>Add Transaction</Text>
            <TouchableOpacity onPress={onPress}>
              <Text style={modelStyles.xButton}>X</Text>
            </TouchableOpacity>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {addTransacktionButtons.map((item) => (
              <CardWithIcon
                key={item.id}
                iconName={item.iconName}
                name={item.name}
                iconColor={item.iconColor}
                color={item.backgroundColor}
              />
            ))}
          </ScrollView>
          <Input
            label="Transaction"
            textInputConfig={{
              placeholder: "transaction note ",
              placeholderTextColor: "gray", // Change placeholder color here
              onChangeText: (expenseNote) => setExpenseNote(expenseNote),
            }}
          />
          <Input
            label="Amount"
            textInputConfig={{
              placeholder: "amount in KWD",
              placeholderTextColor: "gray", // Change placeholder color here
              maxLength: 25,
              onChangeText: (amount) => setAmount(amount),
              keyboardType: "numeric",
            }}
          />
          <TouchableOpacity
            onPress={() => {
              saveButtonPressed();
            }}
            style={modelStyles.button}
          >
            <Text style={modelStyles.buttonText}>Save</Text>
          </TouchableOpacity>
        </View>
      </View>
      </KeyboardAvoidingView>
      </ScrollView>
    </Modal>
  );
};

const modelStyles = StyleSheet.create({
  hStack: {
    flexDirection: "row",
    justifyContent: "space-between", // Add space between items
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.9)", // Semi-transparent background
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  inputContainer: {
    width: "80%",
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 8,
    elevation: 5, // Android only
  },
  input: {
    backgroundColor: "#f2f2f2",
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
    fontSize: 16,
  },
  button: {
    backgroundColor: "black",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  buttonPressed: {
    backgroundColor: "#5D9C59",
  },
  xButton: {
    fontWeight: "bold",
    fontSize: 18,
  },
});

const addTransactionsStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
  },
  card: {
    alignItems: "center",
    padding: 5,
    paddingHorizontal: 2,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  buttonText: {
    fontWeight: "400",
    fontSize: 8,
    paddingTop: 5,
  },
});
export default AddTransactionModal;
