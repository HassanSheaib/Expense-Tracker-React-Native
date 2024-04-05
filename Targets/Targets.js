import { View, StyleSheet, Text, Alert, ActivityIndicator } from "react-native";
import CustomNavBar from "../components/CustomNavBar";
import TargetRow from "../components/TargetRow";
import { titleStyle } from "../helpers/styles";
import { useState, useEffect, useContext } from "react";
import { useIsFocused } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CustomModal from "../modal/CustomModal";
import { MyContext } from "../App";
import {
  getTargetFromStorage,
  saveTargetsToStorage,
  clearTargets,
} from "../helpers/getTargets"; // Adjust the path as needed

const Targets = () => {
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
  const [isLoading, setIsLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [pressedEdit, setPressedEdit] = useState("");
  const [edited, setEdited] = useState(false);

  const saveTarget = (value) => {
    setIsLoading(true)
    if (!isNaN(parseFloat(value))) {
      if (pressedEdit == "savings") {
        saveTargetsToStorage("savings", value);
      } else if (pressedEdit == "income") {
        saveTargetsToStorage("income", value);
      } else {
        saveTargetsToStorage("allowance", value);
      }
      setEdited(!edited);
      setModalVisible(false);
    } else {
      showAlert(
        "Editing Target Failed",
        "Please make sure you enter a valid Target number"
      );
    }
  };
  const handleToggleModal = (pressed) => {
    setPressedEdit(pressed);
    setModalVisible(true);
  };
  const isFocused = useIsFocused();

  const [savingsTarget, setSavingsTarget] = useState(1);
  const [spentTarget, setSpentTarget] = useState(1);
  const [incomeTarget, setIncomeTarget] = useState(1);

  const [savingsProgress, setSavingsProgress] = useState(0.0);
  const [spentProgress, setSpentProgress] = useState(0.0);
  const [incomeProgress, setIncomeProgress] = useState(0.0);

  const fetchData = async (incomeTarget, spentTarget, savingsTarget ) => {
    setIsLoading(true)
    let inValue = 0.0;
    let exValue = 0.0;
    try {
      const data = await AsyncStorage.getItem("transactions");
      if (data !== null) {
        const tempData = JSON.parse(data);
        tempData.forEach((element) => {
          if (user == element.user) {
            const amount = parseFloat(element.amount);
            if (!isNaN(amount)) {
              if (element.category === "money-bill") {
                inValue += amount;
              } else {
                exValue += amount;
              }
            } else {
              console.error("Invalid amount:", element.amount);
            }
          }
        });
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
    if (incomeTarget != 0){
      let income = (inValue * 100) / incomeTarget / 100.0;
      setIncomeProgress(income);
    }
    if (spentTarget != 0 ){
      let expense = (exValue * 100) / spentTarget / 100.0;
      setSpentProgress(expense);
    }
    if(savingsTarget){

      let savings = ((inValue - exValue) * 100) / savingsTarget / 100.0;
      setSavingsProgress(savings);
    }
    setTimeout(async () => {
      setIsLoading(false)
    }, 500);
  };

  useEffect(() => {
    const fetchTargets = async () => {
      const savings = await getTargetFromStorage("savings");
      const income = await getTargetFromStorage("income");
      const allowance = await getTargetFromStorage("allowance");
      setSpentTarget(allowance);
      setSavingsTarget(savings);
      setIncomeTarget(income);

      fetchData(income, allowance, savings );

    };
    fetchTargets();
  }, [isFocused, edited]);

  return (
    <View style={targetScreenStyle.container}>
      <CustomNavBar />
      {isLoading ? (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <ActivityIndicator size="large" color="white" />
        </View>
      ) : (
        <>
          <View style={titleStyle.titleContainer}>
            <Text style={titleStyle.title}>2024 Targets</Text>
          </View>
          <View style={targetScreenStyle.targetRow}>
            <TargetRow
              iconName="piggy-bank"
              title="Target Savings"
              backgroundColor="#5D9C59"
              progress={savingsProgress}
              value={savingsTarget}
              handleToggleModal={() => handleToggleModal("savings")}
            />

            <TargetRow
              iconName="cart-plus"
              title="Target allowance"
              backgroundColor="#A94438"
              value={spentTarget}
              progress={spentProgress}
              handleToggleModal={() => handleToggleModal("allowance")}
            />
            <TargetRow
              iconName="money-bill"
              title="Target Income "
              backgroundColor="#5D9C59"
              value={incomeTarget}
              progress={incomeProgress}
              handleToggleModal={() => handleToggleModal("income")}
            />
          </View>
          <CustomModal
            visible={modalVisible}
            handleToggleModal={handleToggleModal}
            setModalVisible={setModalVisible}
            saveTarget={saveTarget}
          />
        </>
      )}
    </View>
  );
};
const targetScreenStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    alignContent: "space-between",
  },
  targetRow: {
    margin: 8,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "grey",
    padding: 2,
  },
});
export default Targets;
