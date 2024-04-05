import React, { useEffect, useState, useContext } from "react";
import { useIsFocused } from "@react-navigation/native";
import { Text, View, StyleSheet, ScrollView } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CustomNavBar from "../components/CustomNavBar";
import { titleStyle } from "../helpers/styles";
import { barChartConfig } from "../helpers/constants";
import { format } from "date-fns";
import SegmentedControl from "@react-native-segmented-control/segmented-control";
import { BarChart, PieChart } from "react-native-chart-kit";
import { MyContext } from "../App";

const Dashboard = () => {
  const { user } = useContext(MyContext);

  let index = 0;
  let food = {
    name: "Food",
    sum: 0.0,
    color: "white",
    legendFontColor: "white",
    legendFontSize: 10,
  };
  let others = {
    name: "Other",
    sum: 0.0,
    color: "grey",
    legendFontColor: "grey",
    legendFontSize: 10,
  };
  let bills = {
    name: "Bills",
    sum: 0.0,
    color: "#B5C0D0",
    legendFontColor: "#B5C0D0",
    legendFontSize: 10,
  };
  const isFocused = useIsFocused();
  const [dataArray, setDataArray] = useState([]);

  const [barChartArray, setBarChatArray] = useState({
    labels: [],
    datasets: [
      {
        data: [],
      },
    ],
  });
  useEffect(() => {
    if (isFocused) {
      setDataArray([]);
      fetchPieChartData(index);
      fetchBarChartData();
    }
  }, [isFocused]);

  const fetchPieChartData = async (index) => {
    setDataArray([]), (currentDate = new Date());
    try {
      const data = await AsyncStorage.getItem("transactions");
      if (data !== null) {
        const tempData = JSON.parse(data);
        tempData.forEach((element) => {
          if (user == element.user) {
            const transDate = new Date(element.date);
            if (index == 0) {
              const { startDate, endDate } = getCurrentWeekDates();
              const formattedElementDate = format(element.date, "yyyy-MM-dd");
              const formattedCurrentWeekStart = format(startDate, "yyyy-MM-dd");
              const formattedCurrentWeekEnd = format(endDate, "yyyy-MM-dd");
              if (
                formattedElementDate >= formattedCurrentWeekStart &&
                formattedElementDate <= formattedCurrentWeekEnd
              ) {
                if (element.category == "utensils") {
                  food = {
                    ...food,
                    sum: food.sum + parseFloat(element.amount),
                  };
                } else if (element.category == "receipt") {
                  bills = {
                    ...bills,
                    sum: bills.sum + parseFloat(element.amount),
                  };
                } else if (element.category == "cart-plus") {
                  others = {
                    ...others,
                    sum: others.sum + parseFloat(element.amount),
                  };
                }
              }
            } else if (index == 1) {
              if (currentDate.getMonth() == transDate.getMonth()) {
                if (element.category == "utensils") {
                  food = {
                    ...food,
                    sum: food.sum + parseFloat(element.amount),
                  };
                } else if (element.category == "receipt") {
                  bills = {
                    ...bills,
                    sum: bills.sum + parseFloat(element.amount),
                  };
                } else if (element.category == "cart-plus") {
                  others = {
                    ...others,
                    sum: others.sum + parseFloat(element.amount),
                  };
                }
              }
            } else {
              if (currentDate.getFullYear() == transDate.getFullYear()) {
                if (element.category == "utensils") {
                  food = {
                    ...food,
                    sum: food.sum + parseFloat(element.amount),
                  };
                } else if (element.category == "receipt") {
                  bills = {
                    ...bills,
                    sum: bills.sum + parseFloat(element.amount),
                  };
                } else if (element.category == "cart-plus") {
                  others = {
                    ...others,
                    sum: others.sum + parseFloat(element.amount),
                  };
                }
              }
            }
          }
        });
        setDataArray((prevArray) => [...prevArray, food, others, bills]);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const fetchBarChartData = async () => {
    // tempArray=[2000000, 1230000, 0, 233434, 300000, 90000, 120000, 120000, 400000, 32323, 232323, 300000]
    tempArray = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

    try {
      const data = await AsyncStorage.getItem("transactions");
      if (data !== null) {
        const tempData = JSON.parse(data);
        tempData.forEach((element) => {
          if (user == element.user) {
            if (element.category !== "money-bill") {
              const transDate = new Date(element.date);
              const index = transDate.getMonth();
              const expense = tempArray[index] + parseFloat(element.amount);
              tempArray[index] = expense;
            }
          }
        });
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
    setBarChatArray({
      labels: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
      datasets: [
        {
          data: tempArray,
        },
      ],
    });
  };

  const getCurrentWeekDates = () => {
    const now = new Date();
    const currentDay = now.getDay(); // 0 (Sunday) to 6 (Saturday)
    const diffStart = currentDay === 0 ? 0 : currentDay; // Calculate difference from Sunday to Monday
    const diffEnd = 6 - currentDay; // Calculate difference from Saturday

    // Calculate start date of the week (Sunday)
    const startDate = new Date(now);
    startDate.setDate(startDate.getDate() - diffStart); // Move to Sunday

    // Calculate end date of the week (Saturday)
    const endDate = new Date(now);
    endDate.setDate(endDate.getDate() + diffEnd); // Move to Saturday

    return { startDate, endDate };
  };
  const handleIndexChange = (index) => {
    setDataArray([]);
    const temp = index.nativeEvent.selectedSegmentIndex;
    fetchPieChartData(temp);
  };

  return (
    <View style={dashboardScreenStyle.container}>
      <CustomNavBar isHome={false} />
      <ScrollView>
        <View style={dashboardScreenStyle.dashboards}>
          <Text style={titleStyle.title}>Transactions Distrubation</Text>
          <View style={dashboardScreenStyle.dashboardsBorders}>
            <View style={dashboardScreenStyle.segContainer}>
              <SegmentedControl
                values={["Week", "Month", "Year"]}
                selectedIndex={index}
                onChange={handleIndexChange}
                tintColor="grey"
              />
            </View>
            <View style={dashboardScreenStyle.barChartContainer}>
              <PieChart
                style={dashboardScreenStyle.piechart}
                data={dataArray}
                width={350}
                height={200}
                chartConfig={{
                  backgroundGradientFrom: "#1E2923",
                  backgroundGradientTo: "#08130D",
                  color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
                }}
                accessor="sum"
                backgroundColor="transparent"
                absolute
              />
            </View>
          </View>
          <Text style={titleStyle.title}>Monthly Expenses</Text>
          <View style={dashboardScreenStyle.dashboardsBorders}>
            <View style={dashboardScreenStyle.barChartContainer}>
              <BarChart
                data={barChartArray}
                width={340}
                height={300}
                chartConfig={barChartConfig}
                verticalLabelRotation={90}
                withInnerLines={false}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};
const dashboardScreenStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  dashboardsBorders: {
    margin: 8,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "grey",
    padding: 2,
  },
  segContainer: {
    marginHorizontal: 8,
    marginVertical: 4,
    borderRadius: 8,
  },
  piechartContainer: {
    backgroundColor: "#F2E8C6",
    margin: 8,
    borderRadius: 8,
  },
  barChartContainer: {
    backgroundColor: "black",
    margin: 8,
    borderRadius: 8,
  },
  piechart: {
    padding: 8,
  },
});
export default Dashboard;
