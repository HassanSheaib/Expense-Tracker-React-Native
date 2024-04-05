import {
  Text,
  StyleSheet,
  View,
  ScrollView,
  FlatList,
  Dimensions,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CustomNavBar from "../components/CustomNavBar";
import ExpenseRow from "../components/ExpenseRow";
import { titleStyle } from "../helpers/styles";
import IncomeAndExpenseCard from "../components/IncomeAndExpenseCard";
import { useState, useEffect, useContext } from "react";
import AddTransactionModal from "../modal/AddTransactionModal";
import { MyContext } from "../App";

const { width } = Dimensions.get("window");
const ITEM_WIDTH = width / 2; // Set item width to half of the screen width

const Home = () => {
  const { user } = useContext(MyContext);
  const [modalVisible, setModalVisible] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [income, setIncome] = useState(0.0);
  const [expense, setExpense] = useState(0.0);

  const clearLocalStorage = async () => {
    try {
      await AsyncStorage.clear();
      console.log("Local storage cleared successfully");
    } catch (error) {
      console.error("Error clearing local storage:", error);
    }
  };

  useEffect(() => {
    const fetchExpenseData = async () => {
      let mytransactions = []
      let income = 0.0
      let expense = 0.0
      setIncome(0.0);
      setExpense(0.0);
      try {
        const data = await AsyncStorage.getItem("transactions");
        if (data !== null) {
          let tempArray = JSON.parse(data);
          tempArray.forEach((element) => {
            if (user == element.user) {
              mytransactions = [...mytransactions, element]
              const amount = parseFloat(element.amount);
              if (!isNaN(amount)) {
                if (element.category === "money-bill") {
                  income += amount
                } else {
                  expense += amount
                }
              }
            }
          })
          mytransactions.reverse();
          setTransactions(mytransactions);
          setExpense(expense)
          setIncome(income)
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    
    fetchExpenseData();
  }, [modalVisible, user]);

  const setModalVisibleHandler = () => {
    setModalVisible(!modalVisible);
  };

  return (
    <View style={homeScreenStyle.container}>
      <CustomNavBar
        isHome={true}
        onAddPress={setModalVisibleHandler}
      ></CustomNavBar>
      <AddTransactionModal
        onPress={() => {
          setModalVisible(!modalVisible);
        }}
        modalVisible={modalVisible}
      />
      <View style={incomeAndExpense.container}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={incomeAndExpense.item}>
            <IncomeAndExpenseCard
              iconName="arrow-down"
              title="Expense"
              shadeColor="#A94438"
              amount={expense}
            />
          </View>
          <View style={incomeAndExpense.item}>
            <IncomeAndExpenseCard
              iconName="arrow-up"
              title="Income"
              shadeColor="#5D9C59"
              amount={income}
            />
          </View>
        </ScrollView>
      </View>
      <View style={titleStyle.titleContainer}>
        <Text style={titleStyle.title}>Transactions</Text>
      </View>
      <View style={styles.transactionsContainer}>
        <ScrollView>
          {transactions.map((item, index) => (
            <ExpenseRow
              key={index}
              icon={item.category}
              title={item.title}
              date={item.date}
              price={item.amount}
            />
          ))}
        </ScrollView>
      </View>
    </View>
  );
};
const homeScreenStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
});
const styles = StyleSheet.create({
  transactionsContainer: {
    flex: 6,
  },
});
const incomeAndExpense = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    alignItems: "center",
    paddingHorizontal: ITEM_WIDTH / 2, // Add half of the item width as padding on both sides
  },
  item: {
    width: ITEM_WIDTH,
    padding: 5,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },
});
export default Home;
