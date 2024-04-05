import { SafeAreaView, StyleSheet, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "./Home/Home";
import { useFonts } from "expo-font";

import { FontAwesome5 } from "@expo/vector-icons";
import Dashboard from "./Dashboard/Dashboard";
import Targets from "./Targets/Targets";
import { createContext, useEffect, useState } from "react";
import Auth from "./Auth/Auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Settings from "./Settings/Settings";

export const MyContext = createContext();

export default function App() {
  const [loaded] = useFonts({
    PlayfairDisplay: require("./assets/fonts/PlayfairDisplay.ttf"),
    PlayfairDisplayItalic: require("./assets/fonts/PlayfairDisplay-Italic.ttf"),
  });
  const [isLoggedIn, setIsLoggedIn] = useState();
  const [user, setUser] = useState("");

  const Tab = createBottomTabNavigator();

  const clearUserFromLocalStorage = async () => {
    try {
      await AsyncStorage.removeItem("users");
      console.log("User data removed from local storage successfully");
    } catch (error) {
      console.error("Error removing user data from local storage:", error);
    }
  };
  useEffect(() => {
    // clearUserFromLocalStorage()
    const getLoggedState = async () => {
      try {
        const users = await AsyncStorage.getItem("users");
        if (users !== null) {
          const usersData = JSON.parse(users);
          usersData.forEach((user) => {
            if (user.status == "loggedIn") {
              setUser(user.name);
              setIsLoggedIn(true);
              console.log("Match");
            } else {
              console.log("No Match");
            }
          });
        }
      } catch (error) {
        console.error("Error retrieving username:2323", error);
      }
    };
    getLoggedState();
  }, []);

  const handleLogOut = async () => {
    try {
      const users = await AsyncStorage.getItem("users");
      if (users !== null) {
        const usersData = JSON.parse(users);

        const updatedArray = usersData.map((obj) => {
          return { ...obj, status: "loggedOut" };
        });
        try {
          AsyncStorage.setItem("users", JSON.stringify(updatedArray));
          setIsLoggedIn(false);
        } catch {
          console.log("updating user failed");
        }
      }
    } catch (error) {
      console.error("Error retrieving username:11", error);
    }
  };

  return (
    <MyContext.Provider
      value={{ isLoggedIn, user, setUser, setIsLoggedIn, handleLogOut }}
    >
      <SafeAreaView
        style={[styles.container, !isLoggedIn && { backgroundColor: "black" }]}
      >
        {isLoggedIn ? (
          <NavigationContainer>
            <Tab.Navigator
              screenOptions={{
                tabBarActiveTintColor: "white",
                tabBarInactiveTintColor: "grey",
                tabBarStyle: {
                  backgroundColor: "#4D4D4D",
                },
              }}
            >
              <Tab.Screen
                name="Home"
                component={Home}
                options={{
                  tabBarIcon: ({ color, size, focused }) => (
                    <FontAwesome5 name={"home"} color={color} size={size} />
                  ),
                  headerShown: false,
                }}
              />
              <Tab.Screen
                name="Dashboard"
                component={Dashboard}
                options={{
                  tabBarIcon: ({ color, size, focused }) => (
                    <FontAwesome5
                      name={"chart-pie"}
                      color={color}
                      size={size}
                    />
                  ),
                  headerShown: false,
                }}
              />
              <Tab.Screen
                name="Targets"
                component={Targets}
                options={{
                  tabBarIcon: ({ color, size, focused }) => (
                    <FontAwesome5 name={"bullseye"} color={color} size={size} />
                  ),
                  headerShown: false,
                }}
              />
              <Tab.Screen
                name="Setting"
                component={Settings}
                options={{
                  tabBarIcon: ({ color, size, focused }) => (
                    <FontAwesome5 name={"wrench"} color={color} size={size} />
                  ),
                  headerShown: false,
                }}
              />
            </Tab.Navigator>
          </NavigationContainer>
        ) : (
          <Auth />
        )}
      </SafeAreaView>
    </MyContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#4D4D4D",
  },
});
